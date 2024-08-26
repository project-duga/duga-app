const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
        avatarUrl:{type:String, default:"/images/avatar.png"},
		name:{type:String, required:true},
        email:{type:String, unique:true, required:true},
        password:{type:String,required:true},
        favouriteplaylists:[{type:Schema.Types.ObjectId, ref:"Playlist", default: []}]
    
});

const User = model('User', userSchema);

module.exports = User;
