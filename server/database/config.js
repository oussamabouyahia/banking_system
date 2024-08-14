const mysql = require("mysql2");
require("dotenv").config();
var connection = mysql.createConnection({
  host: "localhost", //127.0.0.1
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = connection;
