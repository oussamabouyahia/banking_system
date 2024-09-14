import queries from "../database/queries";
import query from "../database/utility";
import { Request, Response } from "express";
import internalError from "../utils/errorHandler";
export const transactionsList = async (req: Request, res: Response) => {
  try {
    const transactions = await query(queries.getTransactions);
    res.status(200).json({ transactions });
  } catch (error) {
    internalError(res, error);
  }
};
export const myTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const myTransaction = await query(queries.getTransactionsByUser, [id, id]);
    res.status(200).json({ myTransaction });
  } catch (error) {
    internalError(res, error);
  }
};
