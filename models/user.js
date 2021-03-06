const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_special: {
    type: Boolean,
    required: true,
  },
});
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, is_special: this.is_special },
    config.get("SECRET")
  );
};
const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    is_special: Joi.boolean().required()
  };
  return Joi.validate(user, schema);
}
module.exports.User = User;
