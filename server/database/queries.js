const queries = {
  getUser: "SELECT * FROM user WHERE iduser=?",
  getBalanceByUser: "SELECT balance FROM user WHERE iduser=?",
  increaseUserBalance: "UPDATE user SET balance=balance+? WHERE iduser=?",
  decreaseUserBalance: "UPDATE user SET balance=balance-? WHERE iduser=?",
  checkBalanceQuery: "SELECT balance FROM user WHERE iduser=?",
  getAllUsers: `SELECT * FROM user `,
  createUser: "INSERT INTO user (name,balance) VALUES (?,?)",
  updateUser: "UPDATE user SET name=?,balance=? WHERE iduser=?",
  deleteUser: "DELETE FROM user WHERE iduser=?",
};
module.exports = queries;
