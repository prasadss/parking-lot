const parkingModel = require("../models/Parking");
const { Parking } = parkingModel;
const config = require("config");
const moment = require("moment");
async function getAllParking() {
  let data = Parking.find({});
  return data;
}

async function getParkinOccupied() {
  let data = Parking.find({ occupied: true });
  return data;
}

async function reserveSpot(user) {
  let query = {
    reserve_expire: { $lte: new Date(moment().toISOString()) },
    occupied: false,
    is_reserved: false,
  };
  let data = await Parking.find(query);

  //Check if parking is full
  if (!data.length) {
    return {
      errorMessage: "Parking Slot full",
    };
  } else {
    let bookedSlot = await Parking.findOne({
      reserved_by: user._id,
      reserve_expire: { $gte: new Date(moment().toISOString()) },
    });
    if (bookedSlot) {
      return {
        details: bookedSlot,
        message: "Booking already exists",
      };
    }
    // If special user save the reserved spot
    if (user.is_special) {
      query.is_reserved = true;
    }
    let slot = await Parking.findOne(query);

    slot.reserved_by = user._id;
    let wait_time = config.get("WAIT_TIME");
    if (data.length > config.get("TOTAL_PARKING_SPACE") / 2) {
      wait_time += config.get("EXTRA_WAIT_TIME");
    }
    slot.reserve_expire = moment().add(wait_time, "minute").toISOString();
    await slot.save();
    return {
      details: slot,
      message: `Slot is reserved for ${wait_time} minutes`,
    };
  }
}

async function occupySlot(user) {
  let query = {
    reserve_expire: { $gte: new Date(moment().toISOString()) },
    occupied: false,
    reserved_by: user._id,
  };
  let slot = await Parking.findOne(query);
  if (!slot)
    return {
      errorMessage: "You dont have slot booked",
    };
  slot.occupied = true;
  await slot.save();
  return {
    message: `${slot.name} Occupied`,
  };
}

async function freeSlot(user) {
  let query = {
    $or: [
      { occupied: true },
      {
        reserve_expire: { $gte: new Date(moment().toISOString()) },
      },
    ],
    reserved_by: user._id,
  };
  let slot = await Parking.findOne(query);
  if (!slot)
    return {
      errorMessage: "You dont have occupied slot",
    };
  slot.occupied = false;
  slot.reserve_expire = moment().toISOString();
  await slot.save();
  return {
    message: `${slot.name} is free now`,
  };
}
module.exports = {
  getAllParking,
  getParkinOccupied,
  reserveSpot,
  occupySlot,
  freeSlot,
};
