const queries = {
  getUser: "SELECT * FROM user WHERE iduser=?",
  getBalanceByUser: "SELECT balance FROM user WHERE iduser=?",
  increaseUserBalance: "UPDATE user SET balance=balance+? WHERE iduser=?",
  decreaseUserBalance: "UPDATE user SET balance=balance-? WHERE iduser=?",
  checkBalanceQuery: "SELECT balance FROM user WHERE iduser=?",
  getAllUsers: `SELECT * FROM user `,
  createUser: "INSERT INTO user (email,password,name,balance) VALUES (?,?,?,0)",
  updateUser: "UPDATE user SET name=?,balance=? WHERE iduser=?",
  deleteUser: "DELETE FROM user WHERE iduser=?",
  findUserByEmail: "SELECT * FROM user WHERE email=?",
  findUserById: "SELECT * FROM user WHERE iduser=?",
  newTransaction:
    "INSERT INTO transactions (amount,sender,receiver) VALUES (?,?,?)",
  getTransactions: "SELECT * FROM transactions",
  getTransactionsByUser:
    "SELECT * FROM transactions WHERE sender=? OR receiver=?",
};
module.exports = queries;
