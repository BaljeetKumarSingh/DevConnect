const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const {
  validateEditProfileData,
  validateUpdatedPassword,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.delete("/profile/deleteAccount", userAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    // clear cookies
    res.clearCookie("token");
    res.send(req.user.firstName + " Deleted Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!");
    }
    const loggedInUser = req.user;

    // console.log(Object.keys(req.body)); this gives us an array of all the keys of req.body object.

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}'s profile updated successfully!`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    await validateUpdatedPassword(req);
    const loggedInUser = req.user;
    // encrypt new password and update it in DB
    const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
    loggedInUser.password = newPasswordHash;
    await loggedInUser.save();
    res.send("Password updated Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = profileRouter;
