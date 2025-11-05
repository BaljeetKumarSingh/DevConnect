const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedFields = [
    "age",
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "about",
    "skills",
  ];

  const isValidEditRequest = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );
  return isValidEditRequest;
};

module.exports = { validateSignUpData, validateEditProfileData };
