const mongoose = require("mongoose");
const validator = require("validator");
const { PHOTO_URL } = require("../utils/constants");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    photoUrl: {
      type: String,
      default: PHOTO_URL,
    },
    age: { type: Number, min: 10 },
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
