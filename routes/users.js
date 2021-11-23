var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const isLoggedIn = require("./../middleware/isLoggedIn");
const isNotLoggedIn = require("../middleware/isNotLoggedIn");

/* SignUp Users ( create users) */

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup-form");
  })
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.render("signup-form", {
          name,
          email,
          error: { type: "CRED_ERR", msg: "Missing credentials" },
        });
      }

      const user = await User.findOne({ email });
      if (user) {
        res.render("signup-form", {
          name,
          email,
          error: { type: "USR_ERR", msg: "Email exists" },
        });
      }

      const salt = bcrypt.genSaltSync(5);
      const hashPwd = bcrypt.hashSync(password, salt);

      const newUser = await User.create({ name, email, password: hashPwd });
      req.session.loggedinUser = newUser;

      res.redirect("/playlist/discover");
    } catch (err) {
      console.log(err);
    }
  });

/* Login Users*/

router
  .route("/login")
  .get((req, res) => {
    res.render("login-form");
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.render("login-form", {
          error: { type: "CRED_ERR", msg: "Missing credentials" },
        });
      }

      const loggedinUser = await User.findOne({ email });
      if (!loggedinUser) {
        res.render("login-form", {
          error: { type: "USER_ERR", msg: "User does not exist" },
        });
      }

      const pswIsCorrect = bcrypt.compareSync(password, loggedinUser.password);

      if (pswIsCorrect) {
        req.session.loggedinUser = loggedinUser;
        res.redirect("/playlist/discover");
      } else {
        res.render("login-form", {
          error: { type: "PWD_ERR", msg: "Password incorrect" },
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

//logout Users

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.redirect("/");
    else res.redirect("/users/login");
  });
});



//Profile
router.route("/profile")
.get(isLoggedIn, (req, res) => {
  const { name, email, avatarUrl } = req.session.loggedinUser;
  res.render("profile", { name, email, avatarUrl }); 
});


module.exports = router;
