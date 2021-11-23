var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");

//////////////

/* const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
        spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((error) =>
        console.log(
            "Something went wrong when retrieving an access token",
            error
        )
    ); */

router.get("/", (req, res, next) => {
    res.render("index");
});

// GET '/artist-search?artist=nombre-del-artista' => devuelve artistas que corresponden a ese nombre


///////////

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

module.exports = router;
