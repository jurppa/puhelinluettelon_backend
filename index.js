const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
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
  console.log("delete request");
  const id = Number(req.params.id);
  filteredPersons = taulukko.filter((person) => person.id !== id);

  console.log(filteredPersons);
  res.status(204).end();
});
app.post("/api/persons/", (req, res) => {
  const newId = Math.random() * 9999;

  if (!req.body.name || !req.body.number) {
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
const port = 3001;

app.listen(port);
console.log(`Server started, listening port ${port}`);
