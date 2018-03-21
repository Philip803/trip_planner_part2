const Sequelize = require("sequelize");
const db = require("./_db");

const Hotel = db.define("hotel", {
  name: {
    type: Sequelize.STRING
  },
  num_stars:{
    type: Sequelize.FLOAT,
    valiation: {
      min: 1,
      max: 5
    }
  },
  amenities: {
    type: Sequelize.STRING
  }
})

module.exports = Hotel;
