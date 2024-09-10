const connection = require("../database/config");
const queries = require("../database/queries");
const query = require("../database/utility");
const internalError = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//list of users
const allUsers = async (req, res) => {
  try {
    const users = await query(queries.getAllUsers);
    res.status(200).json({ users });
  } catch (error) {
    internalError(res, error);
  }
};
//get balance by user
const getBalance = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(queries.getBalanceByUser, [id]);
    res.status(200).json({ balance: result[0].balance });
  } catch (error) {
    internalError(res, error);
  }
};
//create user
const newUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(queries.createUser, [
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
};
//transaction from a user to another
const increaseBalance = async (req, res) => {
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
    const senderBalance = (
      await query(queries.checkBalanceQuery, [senderId])
    )[0].balance;

    // Check if sender has sufficient balance
    if (senderBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Begin transaction
    await new Promise((resolve, reject) => {
      connection.beginTransaction(async (err) => {
        if (err) return reject(err);

        try {
          // Increase receiver's balance
          await query(queries.increaseUserBalance, [amount, receiverId]);

          // Decrease sender's balance
          await query(queries.decreaseUserBalance, [amount, senderId]);
          //Insert new transaction in the transactions table
          await query(queries.newTransaction, [amount, senderId, receiverId]);
          // Commit transaction
          connection.commit((err) => {
            if (err) return connection.rollback(() => reject(err));

            resolve();
          });
        } catch (error) {
          // Rollback transaction if error occurs
          connection.rollback(() => reject(error));
        }
      });
    });

    res.status(200).json({ message: "Transaction succeeded" });
  } catch (error) {
    res.status(500).send(error.message || "Internal server issue");
  }
};

//update user account
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { name, balance } = req.body;
  try {
    if (name?.length < 3 || balance < 0)
      return res.status(400).send("wrong inputs!");
    const targetUser = await query(queries.getUser, [id]);

    const updatedName = name || targetUser.name;
    const updatedBalance = balance || targetUser.balance;
    const result = await query(queries.updateUser, [
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
};
//delete user account
const deleteAccount = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await query(queries.findUserById, [id]);

    if (!user[0]) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "failed to delete this account, Incorrect password" });
    }

    await query(queries.deleteUser, [id]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    internalError(res, error);
  }
};
//user login and generate token and set a cookie
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await query(queries.findUserByEmail, [email]);
    if (!existingUser[0])
      return res.status(404).json({
        message: `${email} not found! register if you don't have an account`,
      });
    const matchPassword = await bcrypt.compare(
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
      sameSite: "Lax",
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
};
const findUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await query(queries.findUserById, [userId]);
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
};

module.exports = {
  allUsers,
  newUser,
  increaseBalance,
  getBalance,
  updateAccount,
  deleteAccount,
  login,
  findUser,
};
