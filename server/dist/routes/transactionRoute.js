import {
  transactionsList,
  myTransaction,
} from "./../controllers.js/transactionController.js";
import express from "express";
const router = express.Router();
import authenticated from "../middlewares/authenticationUser.js";
router.route("/").get(authenticated, transactionsList);
router.route("/:id").get(authenticated, myTransaction);
export default router;
