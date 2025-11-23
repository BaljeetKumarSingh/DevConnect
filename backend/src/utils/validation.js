const validator = require("validator");
const bcrypt = require("bcrypt");

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
    "gender",
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

const validateUpdatedPassword = async (req) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const isCurrentPasswordValid = await req.user.validatePassword(
    currentPassword
  );

  if (!isCurrentPasswordValid) {
    throw new Error("Please Enter correct current password");
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please Enter a strong password!");
  } else if (!(newPassword === confirmNewPassword)) {
    throw new Error("New password don't match with confirm new password");
  }
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateUpdatedPassword,
};
