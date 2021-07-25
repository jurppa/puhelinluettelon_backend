const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

const cors = require("cors");
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
);
app.use(express.static("build"));

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
  res.send(taulukko);
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
app.post("/api/persons/", (req, res) => {
  const newId = Math.random() * 9999;

  if (!req.body.name || !req.body.number) {
    console.log(req.body);

    console.log("errori");
    return res
      .status(400)
      .json({ error: "Name or number missing from post request" });
  }
  if (taulukko.some((a) => a.name.includes(req.body.name))) {
    return res.status(400).json({ error: "name already in phonebook" });
  }
  const person = req.body;
  person.id = newId;
  taulukko = taulukko.concat(person);
  console.log(taulukko.length);
  res.json(person);

  //
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
