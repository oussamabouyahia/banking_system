import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authenticateToken = (req, res, next) => {
    console.log("Incoming cookies:", req.cookies);
    const token = req.cookies.accessToken;
    console.log("Extracted token:", token);
    if (!token) {
        console.log("No token found in cookies.");
        return res.status(401).json({ message: "Access denied" });
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables");
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // Now TypeScript knows this is valid
        next();
    });
};
export default authenticateToken;
