const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    movies: [ { type: String } ],
    public: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
});

const PlaylistModel = mongoose.model('Playlist', playlistSchema);

module.exports={PlaylistModel}
