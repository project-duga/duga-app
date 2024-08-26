require("dotenv").config();

const path = require("path");
const hbs = require("hbs");

var createError = require("http-errors");
var express = require("express");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var playlistRouter = require("./routes/playlist");

const favicon = require("serve-favicon");

// Register partials
hbs.registerPartials(path.join(__dirname, "/views/partials"));
//require the pakage spotify-web-api-node
const SpotifyWebApi = require("spotify-web-api-node");
var app = express();

// Functional curling style of loading configuration
require("./config/db");
require("./config/global")(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/playlist", playlistRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
