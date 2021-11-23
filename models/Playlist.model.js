const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const playlistSchema = new Schema({
    image: { type: String, default: '../images/avatar.png' },
    name: {String, required:true}, 
    tracks: [{type:String}]
});

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
