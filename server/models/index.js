const Sequelize = require("sequelize");
const db = require("./_db");
const Place = require("./place");
const Hotel = require("./hotel");
const Activity = require("./activity");
const Restaurant = require("./restaurant");

//define relationship here
Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = {
  db, Place, Hotel, Activity, Restaurant
}
