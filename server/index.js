const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const connection = require("./database/config");
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", require("./routes/userRoute"));

// Start the server

app.listen(port, () => {
  connection.connect(function (err) {
    if (err) throw err;
    console.log(` DB connected and Server is listening on port ${port}`);
  });
});
