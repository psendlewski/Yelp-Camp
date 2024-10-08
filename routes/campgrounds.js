const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage }); // przechowuj pliki wewnątrz nowo utworzonego storage

const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

// Index
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

// New Campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  // Campground show page
  .get(catchAsync(campgrounds.showCampground))
  // Update campground
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  // Delete Campground
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// Edit campground
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
