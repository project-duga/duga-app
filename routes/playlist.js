var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Playlist = require("../models/Playlist.model");
const Api = require("../apis/api");

const isLoggedIn = require("./../middleware/isLoggedIn");
const isNotLoggedIn = require("../middleware/isNotLoggedIn");
//require model playlist


router.get("/artist-confirmation", isLoggedIn, (req, res, next) => {
    const { artist } = req.query;

    Api.searchArtists(artist, { limit: 10 })
        .then((data) => {
            console.log("data -> ", data);
            const artistsArray = data.body.artists.items;
            console.log(artistsArray);
            res.render("artist-confirmation", { artists: artistsArray });
        })
        .catch((err) =>
            console.log("The error while searching artists occurred: ", err)
        );
});

// Discover

router.route("/discover")
.get(isLoggedIn, (req, res) => {
  const name = req.session.loggedinUser.name;

  res.render("discover", { name });
  
});


//Artist-Confirm
router.route("/artist-confirmation")
.get(isLoggedIn, (req, res) => {
  res.render("artist-confirmation");
})
.post(async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.render("generatelist", {
          name,
          error: { type: "CRED_ERR", msg: "Missing credentials" },
        });
      }
    
      const newPlaylist = await Playlist.create({name});
      console.log(newPlaylist)
      
      res.redirect("/users/profile");
    } catch (err) {
      console.log(err);
    }
  });

//Swipe
router.route("/swipe")
.get(isLoggedIn, (req, res) => {
  res.render("swipe");
});

//Playlist
router.route("/playlist")
.get(isLoggedIn, (req, res) => {
  res.render("playlist");
});



//GenerateList
router.route("/create-list")
.get(isLoggedIn, (req, res) => {
  res.render("create-list");
});







  

// //Get Recommendations Based on Seeds WIP

// router.get("/:id", (req, res) => {
//     const artistId  = req.params.id;

//     console.log(artistId);
//     Api.getRecommendations({
//         market: ES,
//         seed_artists: artistId,
//         target_popularity: 50
//     }).then(
//         function (data) {
//             console.log(data);
//             let recommendations = data.body;
//             //console.log(recommendations);
//             //res.render("swipping", {track: recommendations});
//         },
//         function (err) {
//             console.log("Something went wrong!", err);
//         }
//     );
// });

module.exports = router;
