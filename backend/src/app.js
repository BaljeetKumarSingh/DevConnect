const express = require("express");

const app = express();

// handle request
// app.use((req, res) => {
//   res.send("Welcome from the server!");
// });

// handle routes
app.use("/test", (req, res) => {
  res.send("Welcome to the test!");
});

app.listen(3000, () => {
  console.log("Server is running successfully on port 3000...");
});
