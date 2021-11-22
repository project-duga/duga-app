const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
        image:{type:String, default:"Number../images/avatar.png"},
		name:{type:String, required:true},
        email:{type:String, unique:true, required:true},
        password:{type:String,required:true},
        favouriteplaylists:{type:Schema.Types.ObjectId, ref:"User"}
    
});

const User = model('User', userSchema);

module.exports = User;
