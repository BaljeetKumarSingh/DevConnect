const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequests");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // api status validation
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: `${status} is invalid status` }); // if we don't put return it will execute below code also
      }

      // validating to send request to valid user only
      const user = await User.findById(toUserId);
      if (!user) {
        return res
          .status(400)
          .json({ message: `UserId: ${toUserId} does not exit!` });
      }

      // if a sender has send any connection request then the sender can't send the connection request again neither the receiver can
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          // mongodb or operator, perform a logical OR operation on an array of expressions.
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(404).json({ message: "Connection already exist" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "Connection send successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      //api level status validation
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send(`${status} is invalid status`);
      }

      // validate requestId
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found!" });
      }

      // update the status of connection request
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.status(200).json({
        message: `Connection request ${status} successfully!`,
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;
