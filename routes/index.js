var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");



router.get("/", (req, res, next) => {
    res.render("index");
});

/* GET discover page. */
router.get("/", (req, res) => {
    User.find().then((users) =>
        res.render("index", { title: "Express", users })
    );
});

/* GET from API */
router.get("/api", (req, res) => {
    Api.getAll().then((entity) =>
        res.render("index", { title: "Express", users: entity })
    );
});



// GET '/artist-search?artist=nombre-del-artista' => devuelve artistas que corresponden a ese nombre
router.get("/users/discover", (req, res, next) => {
    const { artist } = req.query;

    spotifyApi
        .searchArtists(artist)
        .then((data) => {
            console.log("data -> ", data);
            const artistsArray = data.body.artists.items;
            res.render("artist-confirmation", { artists: artistsArray });
        })
        .catch((err) =>
            console.log("The error while searching artists occurred: ", err)
        );
});



module.exports = router;
