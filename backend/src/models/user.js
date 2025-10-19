const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // use camelCase for naming convention
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  emailId: String,
  password: String,
  age: Number,
  gender: String,
});

module.exports = mongoose.model("User", userSchema);
