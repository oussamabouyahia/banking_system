const queries: any = {
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
  getTransactions: `
  SELECT 
    t.idtransactions,
    t.amount,
    t.sender,
    senderUser.name AS senderName,  
    t.receiver,
    receiverUser.name AS receiverName,
     t.transaction_date
  FROM 
    transactions t
  JOIN 
    user senderUser ON t.sender = senderUser.iduser  -- Join on sender
  JOIN 
    user receiverUser ON t.receiver = receiverUser.iduser  -- Join on receiver
`,
  getTransactionsByUser: `
  SELECT 
    t.idtransactions,
    t.amount,
    t.sender,
    senderUser.name AS senderName,  -- Alias for sender's name
    t.receiver,
    receiverUser.name AS receiverName,  -- Alias for receiver's name
     t.transaction_date
  FROM 
    transactions t
  JOIN 
    user senderUser ON t.sender = senderUser.iduser  -- Join on sender
  JOIN 
    user receiverUser ON t.receiver = receiverUser.iduser  -- Join on receiver
  WHERE 
    t.sender = ? OR t.receiver = ?  -- Filter by sender or receiver
`,
};
export default queries;
