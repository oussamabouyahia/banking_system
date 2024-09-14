import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
var connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
export default connection;
