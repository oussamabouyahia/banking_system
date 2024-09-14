var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import queries from "../database/queries.js";
import query from "../database/utility.js";
import internalError from "../utils/errorHandler.js";
export const transactionsList = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const transactions = yield query(queries.getTransactions);
      res.status(200).json({ transactions });
    } catch (error) {
      internalError(res, error);
    }
  });
export const myTransaction = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const myTransaction = yield query(queries.getTransactionsByUser, [
        id,
        id,
      ]);
      res.status(200).json({ myTransaction });
    } catch (error) {
      internalError(res, error);
    }
  });
