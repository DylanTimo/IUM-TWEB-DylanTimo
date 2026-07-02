const mongoose = require('mongoose');

const users_favs
    = new mongoose.Schema(
    {
        username: {type: String, required: true},
        fav_type: {type: String, required: true},
        id: {type: Number, required: true},
    }
);

// exporting the model
module.exports = mongoose.model('users_favs', users_favs);
