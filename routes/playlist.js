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

    res.redirect(
      `/playlist/swipe/?artist=${artistId}&playlist=${newPlaylist._id}`
    );
    // console.log("updateduser", updatedUser);
  } catch (err) {
    console.log(err);
  }
});

//Swipe
router.get("/swipe", isLoggedIn, async (req, res) => {
  try {
    const artistId = req.query.artist;
    const playlistId = req.query.playlist;
    const trackId = req.query.track;
    const operation = req.query.operation;
    let currentPlaylist;

    if (operation === "YES") {
      currentPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $push: { tracks: trackId } },
        { new: true }
      );
    } else if (operation === "NO") {
      currentPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $push: { blacklist: trackId } },
        { new: true }
      );
    } else {
      currentPlaylist = await Playlist.findById(playlistId);
    }

    if (currentPlaylist.tracks.length < 5) {
      let track;
      do {
        track = await Api.getRecommendations({
          seed_artists: artistId,
          limit: 1,
        });
      } while (
        currentPlaylist.tracks.includes(track.id) ||
        currentPlaylist.blacklist.includes(track.id)
      );

      res.render("swipe", {
        track: track.body.tracks[0],
        artist: artistId,
        playlist: playlistId,
      });
    } else {
      res.redirect(`/playlist/create-list/?playlistId=${playlistId}`);
    }
  } catch (err) {
    console.log(err);
  }
});

//Playlist
router.route("/playlist")
.get(isLoggedIn, (req, res) => {
  
  res.render("playlist");
});

//GenerateList
router
    .route("/create-list")
    .get(isLoggedIn, async (req, res) => {
        const playlistId = req.query.playlistId;
        res.render("create-list", { playlistId: playlistId });
    })
    .post(isLoggedIn, async (req, res) => {
        try {
            const playlistId = req.body.playlistId;
            const name = req.body.namePlaylist;
            console.log("parametros", name, playlistId);
            await Playlist.findByIdAndUpdate(
                playlistId,
                { name },
                { new: true }
            );
            res.redirect(`/playlist/playlist`);
        } catch (err) {
            console.log(err);
        }
    });

module.exports = router;
