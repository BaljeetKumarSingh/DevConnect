const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { loadEnvFile } = require("node:process");
loadEnvFile();
const app = express();

// this is an middleware without any route path so every request will pass through it
// it takes JSON object received from api and parse it into js object and store it into req.body
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // create an instance of user model
    const user = new User(req.body);
    await user.save();
    res.send("A user Added Successfully!");
  } catch (err) {
    res.status(404).send("User is not added!:", err.message);
  }
});

// Feed API - Get/Feed - get all the user from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find(req.body);
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//delete a user
app.delete("/delete", async (req, res) => {
  try {
    const deleteCount = await User.deleteOne(req.body);
    res.send(deleteCount);
  } catch (err) {
    res.status(404).send(req.body, "not found");
  }
});

// update a user data using updateOne();
app.patch("/update", async (req, res) => {
  try {
    //await User.updateOne({ age: 23 }); // Updates first doc's `age` property
    const updateUser = await User.updateOne(
      { firstName: "Nilmani" },
      { $inc: { age: 10 } } // increase age by 10, we can also utilize these atomic operations.
    );
    res.send(updateUser);
  } catch (err) {
    res.status(404).send(req.body, "not found");
  }
});

// other supported method
// using chaining syntax

app.patch("/findAndUpdate", async (req, res) => {
  try {
    const updateDetail = await User.findOne(req.body.find).updateOne(
      req.body.update
    );
    if (updateDetail.modifiedCount === 0) {
      res.send("No match found");
    } else {
      res.send("User Updated successfully!");
    }
  } catch (err) {
    res.status(403).send("Something went wrong!:", err.message);
  }
});

// findByIdAndUpdate

app.patch("/updateUser", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
      returnDocument: "after",
    }); // by default it return returnDocument: "before", when there is no option parameter(3rd parameter)
    console.log(user);
    res.send("User updated successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
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
