const express = require("express");
const router = express.Router();
const mail = require("./user");

router.use("/user", mail);

module.exports = router;
