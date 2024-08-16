const connection = require("../database/config");
var getAllUsers = `SELECT * FROM user `;
var createUser = "INSERT INTO user (name,balance) VALUES (?,?)";
var increaseUserBalance = "UPDATE user SET balance=balance+? WHERE iduser=?";
var decreaseUserBalance = "UPDATE user SET balance=balance-? WHERE iduser=?";
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
const increaseBalance = async (req, res) => {
  const receiverId = req.params.receiverId;
  const { amount, senderId } = req.body;
  try {
    const firstQuery = await new Promise((resolve, reject) => {
      connection.query(
        increaseUserBalance,
        [amount, receiverId],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    connection.query(decreaseUserBalance, [amount, senderId], (err, result) => {
      if (err) throw err;
    });

    res.status(200).json({ message: "transaction succeed" });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
module.exports = { allUsers, newUser, increaseBalance };
