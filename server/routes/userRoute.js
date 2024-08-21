const express = require("express");
const {
  allUsers,
  newUser,
  increaseBalance,
  getBalance,
  deleteAccount,
  updateAccount,
} = require("../controllers.js/userControllers");
const router = express.Router();

router.route("/").get(allUsers).post(newUser);
router.route("/:id").get(getBalance).put(updateAccount).delete(deleteAccount);
router.route("/transfert/:receiverId").post(increaseBalance);
module.exports = router;
