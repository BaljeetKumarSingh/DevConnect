const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.delete("/deleteUser", userAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    // clear cookies
    res.clearCookie("token");
    res.send(req.user.firstName + " Deleted Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
