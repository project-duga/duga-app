const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const playlistSchema = new Schema({
    imgUrl: { type: String, default: '../images/avatar.png' },
    name: {type:String, default:"untitled"}, 
    tracks: [{type:String, default:[]}],
    blacklist: [{type:String, default:[]}],

});

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
