const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
);
app.use(express.static("build"));

const Person = require("./models/person");
// Error handler

const errorHandler = (error, request, response, next) => {
  console.log("Logattu errorhandlerissa " + error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else {
    return response.status(400).send(error);
  }
  next(error);
};
morgan.token("body", function (req, res) {
  console.log(req.method);
  if (req.method !== "POST") {
    return null;
  } else {
    return JSON.stringify(req.body.data);
  }
});
let taulukko = [
  {
    id: 1,
    name: "Arto Hellas",
    number: 040 - 123456,
  },
  {
    id: 2,

    name: "Ada Lovelace",
    number: 39 - 44 - 5323523,
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: 12 - 43 - 234345,
  },
  {
    id: 4,

    name: "Mary Poppendieck",
    number: 39 - 23 - 6423122,
  },
];
// Returns all persons
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next("Error in get all: " + error));
});
// Get with id
app.get("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  console.log("request id:llä: " + id);
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end;
    }
  });
});
// Delete request
app.delete("/api/persons/:id", (req, res, next) => {
  console.log("Poistettavan id: " + req.params.id);
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next("Error in delete" + error));
});
// Post person

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next("Error in post" + error));
});
// put

app.put("/api/persons/:id", (req, res, next) => {
  console.log("put request body: " + req.body);
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };
  console.log("person: " + person.name + " " + person.number);
  Person.findByIdAndUpdate(req.body.id, person, { new: true })
    .then((updatedPerson) => {
      console.log("pitäisi toimia: " + updatedPerson);
      res.json(updatedPerson);
    })
    .catch((error) => console.log("jotain meni vikaan " + error));
});
// Returns infopage
app.get("/info", (req, res) => {
  const dateNow = new Date();
  res.send(
    `Phonebook has info for ${taulukko.length} people <br><br> ${dateNow}`
  );
});
app.use(errorHandler);
const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log(`Server started, listening port ${PORT}`);
