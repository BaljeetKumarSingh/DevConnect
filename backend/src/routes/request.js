const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // sending connection request
  console.log("Sending connection request");
  res.send(req.user.firstName + " send the connection request!");
});

module.exports = requestRouter;
