import {
  transactionsList,
  myTransaction,
} from "./../controllers.js/transactionController";
import express from "express";
const router = express.Router();
import authenticated from "../middlewares/authenticationUser";

router.route("/").get(authenticated, transactionsList);
router.route("/:id").get(authenticated, myTransaction);
export default router;
