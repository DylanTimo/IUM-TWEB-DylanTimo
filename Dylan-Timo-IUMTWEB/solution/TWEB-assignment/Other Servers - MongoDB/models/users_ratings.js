const mongoose = require('mongoose');

const users_ratings
    = new mongoose.Schema(
    {
        username: {type: String, required: true},
        anime_id: {type: Number, required: true, min: 0},
        status: {type: String, required: true},
        score: {type: Number, required: true},
        num_watched_episodes: {type: Number},
    }
);

// exporting the model
module.exports = mongoose.model('users_ratings', users_ratings);
