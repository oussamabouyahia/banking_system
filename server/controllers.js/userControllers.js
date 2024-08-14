const connection = require("../database/config");
var getAllUsers = `SELECT * FROM user `;
var createUser = "INSERT INTO user (name,balance) VALUES (?,?)";

const allUsers = (req, res) => {
  try {
    connection.query(getAllUsers, function (err, result) {
      if (err) throw err;
      res.status(200).json({ users: result });
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};

const newUser = (req, res) => {
  const { name, balance } = req.body;
  try {
    connection.query(createUser, [name, balance], (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: "user created successfully " });
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
module.exports = { allUsers, newUser };
