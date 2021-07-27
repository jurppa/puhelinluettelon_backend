/*const mongoose = require("mongoose");
const password = process.argv[2];
const url = `database url here`;
const Person = require("./models/person");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
/* const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
}); */
//const Person = mongoose.model("Person", phonebookSchema);
// Save person to mongodb
/*if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((response) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
}
console.log(process.argv.length);
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
*/
