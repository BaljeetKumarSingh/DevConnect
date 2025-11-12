const jwt = require("jsonwebtoken");
const { loadEnvFile } = require("node:process");
const User = require("../models/user");
loadEnvFile();

const userAuth = async (req, res, next) => {
  try {
    // read token from the cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login!");
    }

    // verify the token contain in the cookie
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User is not present");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
