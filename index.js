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
morgan.token("body", function (req, res) {
  console.log(req.method);
  if (req.method !== "POST") {
    return null;
  } else {
    return JSON.stringify(req.body);
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
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => {
      console.log(persons);
      res.json(persons);
    })
    .catch((error) => console.log(error));
});
// Get with id
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = taulukko.find((person) => person.id === id);
  console.log(id + " " + person.name);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
// Delete person
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  filteredPersons = taulukko.filter((person) => person.id !== id);

  res.status(204).end();
});
// Post person

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: "name missing" });
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
    .catch((error) => console.log(error));
});
// Returns infopage
app.get("/info", (req, res) => {
  const dateNow = new Date();
  res.send(
    `Phonebook has info for ${taulukko.length} people <br><br> ${dateNow}`
  );
});
const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log(`Server started, listening port ${PORT}`);
