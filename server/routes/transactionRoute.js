const express = require("express");
const router = express.Router();
const transactionController = require("../controllers.js/transactionController");

router.route("/").get(transactionController.transactionsList);

module.exports = router;
