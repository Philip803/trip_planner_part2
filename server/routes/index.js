const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");
const Activity = require("../models/activity");
const Restaurant = require("../models/restaurant");

router.get("/attractions", (req, res, next) => {
  Promise.all([
    Hotel.findAll({include: [{all: true}] }),
    Restaurant.findAll({include: [{all: true}] }),
    Activity.findAll({include: [{all: true}] })
  ])
  .then(([hotels, restaurant, activity]) => { //promise return array
    res.json({
      hotels,
      restaurant,
      activity
    })
  })
  .catch(next);
});

module.exports = router;
