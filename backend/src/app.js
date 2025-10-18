const express = require("express");

const app = express();

// handle Auth Middleware for all GET, POST... requests
// instead of writting auth logic for every admin APIs, we can write it once in middleware.

app.use("/admin", (req, res, next) => {
  console.log("Admin Auth is getting checked!");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorised request");
  } else {
    next();
  }
});

// for user path request it will not check for authentication
app.get("/user", (req, res) => {
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
