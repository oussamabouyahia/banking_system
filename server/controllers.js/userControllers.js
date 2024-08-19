const connection = require("../database/config");
const queries = require("../database/queries");

const allUsers = (req, res) => {
  try {
    connection.query(queries.getAllUsers, function (err, result) {
      if (err) throw err;
      res.status(200).json({ users: result });
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
const getBalance = async (req, res) => {
  const { id } = req.params;
  try {
    await new Promise((reject, resolve) => {
      connection.query(queries.getBalanceByUser, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
        res.status(200).json({ balance: result[0].balance });
      });
    });
  } catch (error) {}
};
const newUser = (req, res) => {
  const { name, balance } = req.body;
  try {
    if (name.length < 3 || balance < 10)
      return res.status(400).send("incorrect input");
    connection.query(queries.createUser, [name, balance], (err, result) => {
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
    if (receiverId === senderId)
      return res.status(400).send("you can not transfert money to yourself");
    if (amount <= 0)
      return res.status(400).send("amount should be strictly positive");
    const senderBalance = await new Promise((resolve, reject) => {
      connection.query(queries.checkBalanceQuery, [senderId], (err, result) => {
        if (err) return reject(err);
        resolve(result[0].balance);
      });
    });

    if (senderBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) return reject(err);

        connection.query(
          queries.increaseUserBalance,
          [amount, receiverId],
          (err, result) => {
            if (err) return connection.rollback(() => reject(err));

            connection.query(
              queries.decreaseUserBalance,
              [amount, senderId],
              (err, result) => {
                if (err) return connection.rollback(() => reject(err));

                connection.commit((err) => {
                  if (err) return connection.rollback(() => reject(err));
                  resolve(result);
                });
              }
            );
          }
        );
      });
    });

    res.status(200).json({ message: "Transaction succeeded" });
  } catch (error) {
    res.status(500).send(error.message || "Internal server issue");
  }
};

module.exports = { allUsers, newUser, increaseBalance, getBalance };
