const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Poster: { type: String, required:true} ,
    Year: { type:String, required:true},
    public: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required:true },
});

const PlaylistModel = mongoose.model('Playlist', playlistSchema);

module.exports={PlaylistModel}
