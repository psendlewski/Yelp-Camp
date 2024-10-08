const Review = require("../models/review");
const Campground = require("../models/campground");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save().then((res) => console.log(res));
  req.flash("success", "Created new Review!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/campgrounds/${id}`);
};
