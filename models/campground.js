const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Optional shortcut

const CampgroundSchema = new Schema({
  title: String,
  price: String, //Can be number
  description: String,
  location: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
