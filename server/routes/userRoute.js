const express = require("express");
const { allUsers, newUser } = require("../controllers.js/userControllers");
const router = express.Router();

router.route("/").get(allUsers).post(newUser);
module.exports = router;
