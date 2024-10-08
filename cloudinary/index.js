const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// Jest to łączenie naszego konta cloudinary z tą instancją

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "YelpCamp", // Nazwa folderu w Cloudinary
    allowedFormats: ["jpeg", "png", "jpg"], // Dozwolone formaty plików
  },
});

module.exports = {
  cloudinary,
  storage,
};
