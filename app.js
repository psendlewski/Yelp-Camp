const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");

const reviews = require("./routes/reviews");
const campgrounds = require("./routes/campgrounds");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "thisshouldbeabettersecret1",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.engine("ejs", ejsMate);
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// ===========Routes===========

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// Error- Not Found
app.all("*", (req, res, next) => next(new ExpressError("Page Not Found", 404)));

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(status).render("error", { err });
});

// App.listen
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
