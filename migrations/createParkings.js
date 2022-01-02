const parkingModel = require("../models/Parking");
const { Parking } = parkingModel;
const config = require("config");
const moment = require("moment");

async function createParking() {
  const parking = await Parking.find({});
  if (parking.length != config.get("TOTAL_PARKING_SPACE")) {
    await Parking.deleteMany({});
    let data = [];
    let reserved_spots =
      (config.get("TOTAL_PARKING_SPACE") * config.get("RESERVED_PERCENT")) /
      100;
    for (let index = 0; index < config.get("TOTAL_PARKING_SPACE"); index++) {
      data.push({
        name: `SLOT ${index + 1}`,
        is_reserved: reserved_spots > index,
        reserve_expire: moment().subtract(1,"d").toISOString(),
        reserved_by: "",
        occupied: false,
        is_booked: false,
      });
    }
    await Parking.insertMany(data);
  }
  process.exit(0);
}

module.exports = createParking;
