function isNotLoggedIn(req, res, next) {
  if (req.session.loggedinUser) {
    res.redirect("/users/profile");
  } else {
    next();
  }
}

module.exports = isNotLoggedIn;
