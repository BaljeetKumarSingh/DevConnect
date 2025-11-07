const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        // enum validator restricts a field's value to a predefined set of options
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is invalid status type`,
      },
    },
  },
  { timestamps: true }
);

// compund indexing, indexing makes our queries faster
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// it's kind of middleware that is executed just before saving via model.save() function, hence we need to call next()
connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Can't send connection request to yourself");
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
