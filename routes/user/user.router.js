const express = require("express");
const router = express.Router();
const { validateUser, validateLoginRequest } = require("./user.validator");
const { registerUser, loginUser } = require("../../controller/user.controller");
const _ = require("lodash");
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { result, token, errorMessage } = await registerUser(req.body);

  if (errorMessage) {
    res.status(401).send(errorMessage);
  }
  res
    .header("x-auth-token", token)
    .send(_.pick(result, ["_id", "email", "password"]));
});

router.post("/login", async (req, res) => {
  const { error } = validateLoginRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let token = await loginUser(req.body);
  res.send({ token });
});
module.exports = router;
