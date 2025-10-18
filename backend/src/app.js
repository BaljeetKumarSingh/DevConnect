const express = require("express");

const app = express();

// error handling

// 1 using try catch

// app.get("/getUserData", (req, res) => {
//   try {
//     // logic of DB call & get user data
//     throw new Error("Error");
//     res.send("User data send");
//   } catch (err) {
//     res.status(500).send("Some error occured, contact support team");
//   }
// });

// 2. using middle ware

app.get("/getUserData", (req, res) => {
  // logic of DB call & get user data
  throw new Error("Error");
  res.send("User data send");
});

// Wild card error handler, always keep it in end so that you can catch the error
app.use("/", (err, req, res, next) => {
  if (err) {
    // log your error
    res.status(500).send("Something went wrong!");
  }
});

app.listen(3000, () => {
  console.log("Server is running successfully on port 3000...");
});
