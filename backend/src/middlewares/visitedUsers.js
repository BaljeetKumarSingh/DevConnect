const connectionRequests = require("../models/connectionRequests");

// it contains those users whose status is either accepted or interested and those i have ignored or rejected
// i.e i want that those who are rejected and ignored by me can find me in their feed and can resend connection request
// but they will not come again in my feed.
const visitedUsers = async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const visitedRequests = await connectionRequests
      .find({
        $or: [
          {
            $or: [
              { fromUserId: loggedInUser._id, status: "ignored" },
              { toUserId: loggedInUser._id, status: "rejected" },
            ],
          },
          {
            $and: [
              {
                $or: [
                  { fromUserId: loggedInUser._id },
                  { toUserId: loggedInUser._id },
                ],
              },
              { $or: [{ status: "accepted" }, { status: "interested" }] },
            ],
          },
        ],
      })
      .populate("fromUserId", "_id")
      .populate("toUserId", "_id");

    // filter out the required connections i.e. other than loggedInUser
    const data = visitedRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    req.visitedIds = data.map((connection) => connection._id.toString());
    next();
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
};

module.exports = visitedUsers;
