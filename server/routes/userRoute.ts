import express from "express";
import {
  allUsers,
  newUser,
  increaseBalance,
  getBalance,
  deleteAccount,
  updateAccount,
  login,
  findUser,
} from "../controllers.js/userControllers";
const router = express.Router();
import validateUserInput from "../middlewares/validateUser";
import validateLogin from "../middlewares/validateLogin";
import authenticated from "../middlewares/authenticationUser";
router.route("/").get(allUsers).post(validateUserInput, newUser);
router
  .route("/:id")
  .get(authenticated, getBalance)
  .put(authenticated, updateAccount)
  .delete(deleteAccount);
router.route("/transfert/:receiverId").post(authenticated, increaseBalance);
router.route("/login").post(validateLogin, login);
router.route("/profile/:id").get(authenticated, findUser);
export default router;
