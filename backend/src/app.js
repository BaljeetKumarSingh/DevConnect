const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { loadEnvFile } = require("node:process");
loadEnvFile();
const app = express();

app.post("/signup", async (req, res) => {
  // creating an instance of user model
  // an instance of a model is called a document
  const user = new User({
    firstName: "Baljeet",
    lastName: "Singh",
    emailId: "Baljeet@gmail.com",
    password: "Baljeet@123",
    age: 24,
    gender: "Male",
  });
  try {
    // in order to save to the database
    await user.save(); // since this returns promise so we use await
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection establish");
    // always listen requests only after Database connection is established successfully
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running successfully on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error("Database can't be connected");
  });
