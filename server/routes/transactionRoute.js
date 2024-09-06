const express = require("express");
const router = express.Router();
const authenticated = require("../middlewares/authenticationUser");
const transactionController = require("../controllers.js/transactionController");

router.route("/").get(authenticated, transactionController.transactionsList);
router.route("/:id").get(authenticated, transactionController.myTransaction);
module.exports = router;
