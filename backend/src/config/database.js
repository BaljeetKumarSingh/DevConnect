const mongoose = require("mongoose");
const { loadEnvFile } = require("node:process");
loadEnvFile();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
};

module.exports = connectDB;
