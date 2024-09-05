const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 8001;
const connection = require("./database/config");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/user", require("./routes/userRoute")); // Define API routes before static and catch-all
app.use("/transaction", require("./routes/transactionRoute"));
// Serve static files (use a specific route to avoid conflicts)
app.use(
  "/static",
  express.static(path.join(__dirname, "../client/dist/static"))
); // Example: only serve static files from a specific folder

// Serve static files for assets or public files
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all route to serve the main HTML file for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start the server
app.listen(port, () => {
  connection.connect(function (err) {
    if (err) throw err;
    console.log(`DB connected and Server is listening on port ${port}`);
  });
});
