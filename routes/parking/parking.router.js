const express = require("express");
const router = express.Router();
const {
  getAllParking,
  getParkinOccupied,
  reserveSpot,
  occupySlot,
  freeSlot,
} = require("../../controller/parking.controller");
const _ = require("lodash");
const auth = require("../../middleware/auth");
router.get("/slots", async (req, res) => {
  let data = await getAllParking();
  res.send(data);
});

router.get("/slots-occupied", async (req, res) => {
  let data = await getParkinOccupied();
  res.send(data);
});

router.get("/reserve-slot", auth, async (req, res) => {
  let data = await reserveSpot(req.user);
  res.send(data);
});

router.get("/occupy-slot", auth, async (req, res) => {
  let data = await occupySlot(req.user);
  res.send(data);
});

router.get("/free-slot", auth, async (req, res) => {
  let data = await freeSlot(req.user);
  res.send(data);
});

module.exports = router;
