const Sequelize = require("sequelize");
const db = require("./_db");

const Activity = db.define("activity", {
  name: {
    type: Sequelize.STRING
  },
  age_range:{
    type: Sequelize.FLOAT
  }
})

module.exports = Activity;
