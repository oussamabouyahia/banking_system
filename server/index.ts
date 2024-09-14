import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 8001;
import connection from "./database/config";
import userRouter from "./routes/userRoute";
import transactionRouter from "./routes/transactionRoute";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/user", userRouter); // Define API routes before static and catch-all
app.use("/transaction", transactionRouter);
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
