var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");
//require model playlist

//Get artist
router.get("/discover", (req, res, next) => {
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

//Get Recommendations Based on Seeds

/* router.get("/swipping")
Api
    .getRecommendations({
        min_energy: 0.4,
        seed_artists: ["6mfK6Q2tzLMEchAr0e9Uzu"],
        min_popularity: 50,
    })
    .then(
        function (data) {
            let recommendations = data.body;
            console.log(recommendations);
        },
        function (err) {
            console.log("Something went wrong!", err);
        }
    ); */

module.exports = router;
