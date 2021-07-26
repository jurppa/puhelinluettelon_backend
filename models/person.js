const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
// Number validation from https://stackoverflow.com/questions/46806943/mongoose-schema-number-field-to-be-at-exact-length
const phonebookSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  number: {
    type: Number,
    required: true,
    validate: {
      validator: (number) => {
        return number.toString().length > 9;
      },
    },
  },
});
phonebookSchema.plugin(uniqueValidator);

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);
