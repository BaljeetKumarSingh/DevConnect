const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { loadEnvFile } = require("node:process");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

loadEnvFile();
const app = express();

// this is an middleware without any route path so every request will pass through it
// it takes JSON object received from api and parse it into js object and store it into req.body
app.use(express.json());
app.use(cookieParser()); // this parse the cookie

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
    // console.log(passwordHash);

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
    const isPasswordValid = await bcrypt.compare(password, user.password); // this returns true or false

    if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    } else {
      // create JWT Token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // Add token to the cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      }); // cookie will be removed after 1 hours
      res.send("LoggedIn Successfully!");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// get the cookie from the server
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

// delete logged in user
app.delete("/deleteUser", userAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    // clear cookies
    res.clearCookie("token");
    res.send(req.user.firstName + " Deleted Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// send connection request
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // sending connection request
  console.log("Sending connection request");
  res.send(req.user.firstName + " send the connection request!");
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
