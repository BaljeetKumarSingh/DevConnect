const express = require("express");
const connectDB = require("./config/database");
const { loadEnvFile } = require("node:process");
const cookieParser = require("cookie-parser");
const cors = require("cors");

loadEnvFile();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // port address of frontend
    credentials: true, // it will treat http as https and thus help browser to get token in its cookies
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
