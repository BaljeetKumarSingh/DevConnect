const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { loadEnvFile } = require("node:process");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
loadEnvFile();
const app = express();

// this is an middleware without any route path so every request will pass through it
// it takes JSON object received from api and parse it into js object and store it into req.body
app.use(express.json());

// NEVER TRUST req.body
// Attacker can put any malicious data in it and pollute your database
// so make sure to validate and sanitize your data before storing it into database

app.post("/signup", async (req, res) => {
  try {
    // validate the data

    validateSignUpData(req);

    // Encrypt the password

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // create an instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("A user Added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    // get data from req.body
    const { emailId, password } = req.body;

    // validate email
    if (!validator.isEmail(emailId)) {
      throw new Error("Incorrect Email");
    }

    // authenticate email and password
    // authenticate email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }

    // authenticate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    } else {
      res.send("LoggedIn Successfully!");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// find and delete

app.delete("/delete", async (req, res) => {
  try {
    const count = await User.deleteMany(req.body);
    res
      .status(200)
      .send(`${count.deletedCount} documents deleted successfully!`);
  } catch (err) {
    res.status(400).send(`Unable to proceed request: ${err}`);
  }
});

// update
app.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["about", "age", "gender", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      data,
      { returnDocument: "after", runValidators: true } // runValidators allow us to run validate function of the schema during updates
    );
    res.status(200).send("User Updated successfully:\n" + updatedUser);
  } catch (err) {
    res.status(400).send("Something went wrong!:\n" + err.message);
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
