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
import connection from "../database/config.js";
import queries from "../database/queries.js";
import query from "../database/utility.js";
import internalError from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//list of users
export const allUsers = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const users = yield query(queries.getAllUsers);
      res.status(200).json({ users });
    } catch (error) {
      internalError(res, error);
    }
  });
//get balance by user
export const getBalance = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const result = yield query(queries.getBalanceByUser, [id]);
      res.status(200).json({ balance: result[0].balance });
    } catch (error) {
      internalError(res, error);
    }
  });
//create user
export const newUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = yield bcrypt.hash(password, 10);
      const result = yield query(queries.createUser, [
        email,
        hashedPassword,
        name,
      ]);
      res
        .status(201)
        .json({ message: "user created successfully ", user: result[0] });
    } catch (error) {
      internalError(res, error);
    }
  });
//transaction from a user to another
export const increaseBalance = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const receiverId = req.params.receiverId;
    const { amount, senderId } = req.body;
    try {
      // Check if the sender and receiver are the same
      if (receiverId === senderId) {
        return res.status(400).send("You cannot transfer money to yourself");
      }
      // Check if the amount is valid
      if (amount < 10) {
        return res.status(400).send("Amount should be at least 10");
      }
      // Get sender's balance
      const senderBalance = (yield query(queries.checkBalanceQuery, [
        senderId,
      ]))[0].balance;
      // Check if sender has sufficient balance
      if (senderBalance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      // Begin transaction
      yield new Promise((resolve, reject) => {
        connection.beginTransaction((err) =>
          __awaiter(void 0, void 0, void 0, function* () {
            if (err) return reject(err);
            try {
              // Increase receiver's balance
              yield query(queries.increaseUserBalance, [amount, receiverId]);
              // Decrease sender's balance
              yield query(queries.decreaseUserBalance, [amount, senderId]);
              //Insert new transaction in the transactions table
              yield query(queries.newTransaction, [
                amount,
                senderId,
                receiverId,
              ]);
              // Commit transaction
              connection.commit((err) => {
                if (err) return connection.rollback(() => reject(err));
                resolve();
              });
            } catch (error) {
              // Rollback transaction if error occurs
              connection.rollback(() => reject(error));
            }
          })
        );
      });
      res.status(200).json({ message: "Transaction succeeded" });
    } catch (error) {
      res.status(500).send(error.message || "Internal server issue");
    }
  });
//update user account
export const updateAccount = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, balance } = req.body;
    try {
      if (
        (name === null || name === void 0 ? void 0 : name.length) < 3 ||
        balance < 0
      )
        return res.status(400).send("wrong inputs!");
      const targetUser = yield query(queries.getUser, [id]);
      const updatedName = name || targetUser.name;
      const updatedBalance = balance || targetUser.balance;
      const result = yield query(queries.updateUser, [
        updatedName,
        updatedBalance,
        id,
      ]);
      res
        .status(200)
        .json({ message: "user updated successfully", user: result[0] });
    } catch (error) {
      internalError(res, error);
    }
  });
//delete user account
export const deleteAccount = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    try {
      const user = yield query(queries.findUserById, [id]);
      if (!user[0]) {
        return res.status(404).json({ message: "User not found" });
      }
      const passwordMatch = yield bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({
            message: "failed to delete this account, Incorrect password",
          });
      }
      yield query(queries.deleteUser, [id]);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      internalError(res, error);
    }
  });
//user login and generate token and set a cookie
export const login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
      const existingUser = yield query(queries.findUserByEmail, [email]);
      if (!existingUser[0])
        return res.status(404).json({
          message: `${email} not found! register if you don't have an account`,
        });
      const matchPassword = yield bcrypt.compare(
        password,
        existingUser[0].password
      );
      if (!matchPassword) {
        return res
          .status(401)
          .json({ message: "unauthorized access : wrong password" });
      }
      //generate token
      const expirationTime = 180;
      const accessToken = jwt.sign(
        { id: existingUser[0].iduser },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: expirationTime + "s",
        }
      );
      // Set the JWT in an HttpOnly cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: expirationTime * 1000,
        sameSite: "lax",
      });
      res.status(200).json({
        message: "login successfully",
        tokenDuration: expirationTime * 1000,
        existingUser: {
          iduser: existingUser[0].iduser,
          name: existingUser[0].name,
          balance: existingUser[0].balance,
          email: existingUser[0].email,
        },
      });
    } catch (error) {
      internalError(res, error);
    }
  });
export const findUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
      const user = yield query(queries.findUserById, [userId]);
      if (!user[0]) return res.status(404).json({ message: "User not found" });
      res.status(200).json({
        user: {
          iduser: user[0].iduser,
          email: user[0].email,
          name: user[0].name,
          balance: user[0].balance,
        },
      });
    } catch (error) {
      internalError(res, error);
    }
  });
