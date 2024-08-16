const express = require("express");
const {
  allUsers,
  newUser,
  increaseBalance,
  getBalance,
} = require("../controllers.js/userControllers");
const router = express.Router();

router.route("/").get(allUsers).post(newUser);
router.route("/:id").get(getBalance);
router.route("/:receiverId").post(increaseBalance);
module.exports = router;
