const express = require("express");
const {
  allUsers,
  newUser,
  increaseBalance,
  getBalance,
  deleteAccount,
  updateAccount,
  login,
  findUser,
} = require("../controllers.js/userControllers");
const router = express.Router();
const validateUserInput = require("../middlewares/validateUser");
const validateLogin = require("../middlewares/validateLogin");
const authenticated = require("../middlewares/authenticationUser");
router.route("/").get(allUsers).post(validateUserInput, newUser);
router
  .route("/:id", authenticated)
  .get(getBalance)
  .put(updateAccount)
  .delete(deleteAccount);
router.route("/transfert/:receiverId").post(authenticated, increaseBalance);
router.route("/login").post(validateLogin, login);
router.route("/profile/:id").get(authenticated, findUser);
module.exports = router;
