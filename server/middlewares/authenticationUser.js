const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateToken = (req, res, next) => {
  console.log("Incoming cookies:", req.cookies);
  const token = req.cookies.accessToken;
  console.log("Extracted token:", token);
  if (!token) {
    console.log("No token found in cookies.");
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
module.exports = authenticateToken;
