const express = require("express");
const {
  allUsers,
  newUser,
  increaseBalance,
} = require("../controllers.js/userControllers");
const router = express.Router();

router.route("/").get(allUsers).post(newUser);
router.route("/:receiverId").post(increaseBalance);
module.exports = router;
