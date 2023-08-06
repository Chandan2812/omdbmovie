const mongoose=require("mongoose")

const userSchema =mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    playlists: [ { type: mongoose.Schema.Types.ObjectId, ref: 'PlaylistModel' } ],
});

const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}