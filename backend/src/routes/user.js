const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequests");
const visitedUsers = require("../middlewares/visitedUsers");
const user = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age gender about skills photoUrl";
// get all the pending connection request for logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Requests fetched successfully!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// get all my connections, wheather that are accepted by other or accepted by me
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const acceptedRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      status: "accepted",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA); // here we are populating with both the data

    // BugFix: filter out the required connections i.e. other than loggedInUser
    const data = acceptedRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.status(200).json({
      message: "Accepted request fetched sucessfully!",
      connections: data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// get all the feed i.e we want the data of all the user that are not in my connections.
userRouter.get("/user/feed", userAuth, visitedUsers, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const visitedIds = req.visitedIds;

    // total feed except self
    const totalFeed = await user.find({ _id: { $ne: loggedInUser._id } });

    // feed other than my visitedUsers
    const filteredFeed = totalFeed.filter(
      (data) => !visitedIds.includes(data._id.toString())
    );
    res.json(filteredFeed);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = userRouter;
