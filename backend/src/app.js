const express = require("express");

const app = express();

// another way to handle multiple route handler or middleware

app.use("/", (req, res, next) => {
  // middleware
  // res.send("Handle / route"); // this will not let /user to send its response, for every path after / it will send this response.
  next();
});

app.use(
  "/user",
  (req, res, next) => {
    // middleware: that's is not sending response
    console.log("Handling /user route");
    next();
  },
  (req, res, next) => {
    // route handler: that's actually sending response
    res.send("1st Response");
  },
  (req, res, next) => {
    // never executes, as we don't put next() in above route handler
    res.send("2nd Response"); // even there is next() in above rH, this will give error
  }
);

app.listen(3000, () => {
  console.log("Server is running successfully on port 3000...");
});
