const Sequelize = require("sequelize");
const db = require("./_db");

const Restaurant = db.define("restaurant", {
  name: {
    type: Sequelize.STRING
  },
  price:{
    type: Sequelize.INTEGER,
    valiation: {
      min: 1,
      max: 5
    }
  },
  cuisine: {
    type: Sequelize.STRING,
  }
})

module.exports = Restaurant;
