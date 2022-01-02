const express = require("express");
const router = express.Router();
const user = require("./user");
const parking = require("./parking");

router.use("/user", user);
router.use("/parking", parking);

module.exports = router;
