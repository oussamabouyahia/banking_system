const queries = {
  getBalanceByUser: "SELECT balance FROM user WHERE iduser=?",
  increaseUserBalance: "UPDATE user SET balance=balance+? WHERE iduser=?",
  decreaseUserBalance: "UPDATE user SET balance=balance-? WHERE iduser=?",
  checkBalanceQuery: "SELECT balance FROM user WHERE iduser=?",
  getAllUsers: `SELECT * FROM user `,
  createUser: "INSERT INTO user (name,balance) VALUES (?,?)",
};
module.exports = queries;
