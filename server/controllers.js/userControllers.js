const connection = require("../database/config");
const queries = require("../database/queries");
const query = require("../database/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//list of users
const allUsers = async (req, res) => {
  try {
    const users = await query(queries.getAllUsers);
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
//get balance by user
const getBalance = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(queries.getBalanceByUser, [id]);
    res.status(200).json({ balance: result[0].balance });
  } catch (error) {}
};
//create user
const newUser = async (req, res) => {
  const { email, password, name, balance } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(queries.createUser, [
      email,
      hashedPassword,
      name,
      balance,
    ]);
    res
      .status(201)
      .json({ message: "user created successfully ", user: result[0] });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
//transaction from a user to another
const increaseBalance = async (req, res) => {
  const receiverId = req.params.receiverId;
  const { amount, senderId } = req.body;

  try {
    if (receiverId === senderId)
      return res.status(400).send("You cannot transfer money to yourself");
    if (amount < 10)
      return res.status(400).send("Amount should be at least 10");

    const senderBalance = (
      await query(queries.checkBalanceQuery, [senderId])
    )[0].balance;

    if (senderBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await new Promise((resolve, reject) => {
      connection.beginTransaction(async (err) => {
        if (err) return reject(err);

        try {
          await query(queries.increaseUserBalance, [amount, receiverId]);
          await query(queries.decreaseUserBalance, [amount, senderId]);

          connection.commit((err) => {
            if (err) return connection.rollback(() => reject(err));
            resolve();
          });
        } catch (error) {
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
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
//delete user account
const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    await query(queries.deleteUser, [id]);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
  }
};
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
    const accessToken = jwt.sign(
      { id: existingUser[0].iduser },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );
    // Set the JWT in an HttpOnly cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 1000,
      sameSite: "Lax",
    });
    res.status(200).json({
      message: "login successfully",
      existingUser: {
        iduser: existingUser[0].iduser,
        name: existingUser[0].name,
        balance: existingUser[0].balance,
        email: existingUser[0].email,
      },
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "internal server issue");
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
    res.status(500).json({ message: "Internal server issue" });
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
