const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const ParkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  reserved_by: String,
  reserve_expire: {
    type: Date,
    required: true,
  },
  occupied: Boolean,
  is_reserved: Boolean,
});
ParkingSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("SECRET")
  );
};
const Parking = mongoose.model("Parking", ParkingSchema);

function validateParking(parking) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(parking, schema);
}
module.exports = { Parking, validateParking };
