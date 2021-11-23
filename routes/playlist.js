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
      const artistsArray = data.body.artists.items;
      res.render("artist-confirmation", { artists: artistsArray });
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

// Discover

router.route("/discover").get(isLoggedIn, (req, res) => {
  const name = req.session.loggedinUser.name;

  res.render("discover", { name });
});

//Artist-Confirm
router.route("/artist-confirmation").get(isLoggedIn, (req, res) => {
  res.render("artist-confirmation");
});

router.route("/create/:id").post(isLoggedIn, async (req, res) => {
  try {
    const artistId = req.params.id;
    const newPlaylist = await Playlist.create({ name: "untitled" });
    const userId = req.session.loggedinUser._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favouriteplaylists: newPlaylist._id },
      },
      { new: true }
    );

    res.redirect(`/playlist/swipe/${artistId}/${newPlaylist._id}`);
    // console.log("updateduser", updatedUser);
  } catch (err) {
    console.log(err);
  }
});

//Swipe
router
  .route("/swipe/:artistId/:playlistId")
  .get(isLoggedIn, async (req, res) => {
    try {
      const artistId = req.params.artistId;
      const playlistId = req.params.playlistId;

      const currentPlaylist = await Playlist.findById(playlistId);
      console.log(currentPlaylist);
      if (currentPlaylist.tracks.length < 5) {
        const track = await Api.getRecommendations({
          seed_artists: artistId,
          limit: 1,
          market: "ES",
        });

        // await Playlist.findByIdAndUpdate(playlistId,{
        //   $push: { tracks: "track number 1" },
        // });
        //res.redirect(`/playlist/swipe/${artistId}/${playlistId}`);
        console.log(track.body.tracks[0]);
        console.log("Jordi ---->", track.body.tracks[0].album.images[0].url);
        res.render("swipe", { track: track.body.tracks[0] });
      } else {
        res.redirect("/playlist/create-list");
      }
    } catch (err) {
      console.log(err);
    }
  });

//Playlist
router.route("/playlist").get(isLoggedIn, (req, res) => {
  res.render("playlist");
});

//GenerateList
router.route("/create-list").get(isLoggedIn, (req, res) => {
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
