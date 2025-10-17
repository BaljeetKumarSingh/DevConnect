const express = require("express");

const app = express();

// playing out with multiple route handler

// route handle signature

// app.use("/path", rH, rH1, rH2, rH3, rH4, rH5);
// app.use("/path", [rH, rH1, rH2], rH3, rH4, rH5);
// app.use("/path", rH, [rH1, rH2], rH3, rH4, rH5); // mix-match array

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user 1");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 5");
    res.send("5th response");
    // next(); // if we call this without sending response, cannot GET /user
    // b/c it is waiting for the next route handler which is not preset.
  }
);

app.listen(3000, () => {
  console.log("Server is running successfully on port 3000...");
});
