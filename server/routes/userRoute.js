const express = require("express");
const {
  allUsers,
  newUser,
  increaseBalance,
  getBalance,
  deleteAccount,
  updateAccount,
  login,
} = require("../controllers.js/userControllers");
const router = express.Router();
const validateUserInput = require("../middlewares/validateUser");
const validateLogin = require("../middlewares/validateLogin");

router.route("/").get(allUsers).post(validateUserInput, newUser);
router.route("/:id").get(getBalance).put(updateAccount).delete(deleteAccount);
router.route("/transfert/:receiverId").post(increaseBalance);
router.route("/login").post(validateLogin, login);
module.exports = router;
