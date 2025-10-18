const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

// here we don't need to check for user authentication
app.post("/user/login", (req, res) => {
  res.send("User is logged in");
});

app.get("/user", userAuth, (req, res) => {
  // if user is authenticated then only this response is send
  res.send("User details");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data send");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user!");
});

app.listen(3000, () => {
  console.log("Server is running successfully on port 3000...");
});
