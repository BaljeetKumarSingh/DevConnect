const express = require("express");

const app = express();

// handling different http request

app.use("/user", (req, res) => {
  res.send("Hello user!");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Baljeet", lastName: "Singh" });
});

app.post("/user", (req, res) => {
  // saving data to db
  res.send("Data successfully saved to Database!");
});

app.delete("/user", (req, res) => {
  // delete user from the database
  res.send("User is deleted from the database");
});

app.put("/user", (req, res) => {
  res.send("Database updated successfully");
});

app.listen(3000, () => {
  console.log("Server is running successfully on port 3000...");
});
