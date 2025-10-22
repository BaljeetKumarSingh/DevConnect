const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // use camelCase for naming convention
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 }, // String is shorthand for {type: String}
    lastName: String,
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
      // custom validation
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    about: { type: String, default: "This is default about of the user" },
    skills: [String],
  },
  { timestamps: true } // adds timestamp to our documents
);

module.exports = mongoose.model("User", userSchema);
