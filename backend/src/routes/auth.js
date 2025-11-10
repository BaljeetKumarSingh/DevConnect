const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validate the data

    validateSignUpData(req);

    // Encrypt the password

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // create an instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("A user Added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // get data from req.body
    const { emailId, password } = req.body;

    // validate email
    if (!validator.isEmail(emailId)) {
      throw new Error("Incorrect Email");
    }

    // authenticate email and password

    // authenticate email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }

    // authenticate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    } else {
      // create JWT Token
      const token = await user.getJWT();

      // Add token to the cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000),
      }); // cookie will be removed after 24 hours
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  // Remove the cookie
  //   res.cookie("token", null, { expires: new Date(Date.now()) });
  res.clearCookie("token");
  res.send("Logout Successful!");
});

module.exports = authRouter;
