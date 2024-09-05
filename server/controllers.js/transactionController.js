const connection = require("../database/config");
const queries = require("../database/queries");
const query = require("../database/utility");
const transactionsList = async (req, res) => {
  try {
    const transactions = await query(queries.getTransactions);
    res.status(200).json({ transactions });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
const myTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const myTransaction = await query(queries.getTransactionsByUser, [id, id]);
    res.status(200).json({ myTransaction });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
module.exports = { transactionsList };
