const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utilities/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }), // 2 argument - options
    catchAsync(users.login)
  );

router.get("/logout", users.logout);

// Możemy dodać kilka oddzielnych routes dla różnych strategii- np. logowanie przy użyciu Google lub FB, z różnymi parametrami passport.authenticate()
module.exports = router;
