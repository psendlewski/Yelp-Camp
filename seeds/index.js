const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66dcc7570326606617acb0e9",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero sapiente dolore, commodi ullam amet omnis rem pariatur modi! Voluptatem, incidunt! Quidem quasi harum officiis esse, delectus temporibus ex! Maiores, iste.",
      price, // price: price
      images: [
        {
          url: "https://res.cloudinary.com/dicl9svex/image/upload/v1726760951/YelpCamp/l9ukybmfhrcnidl4wccc.webp",
          filename: "YelpCamp/l9ukybmfhrcnidl4wccc",
        },
        {
          url: "https://res.cloudinary.com/dicl9svex/image/upload/v1726760951/YelpCamp/wg8atvx73hh8qe19ygjz.jpg",
          filename: "YelpCamp/wg8atvx73hh8qe19ygjz",
        },
        {
          url: "https://res.cloudinary.com/dicl9svex/image/upload/v1726760952/YelpCamp/q11xrsw2fcq5javuo6jd.jpg",
          filename: "YelpCamp/q11xrsw2fcq5javuo6jd",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
