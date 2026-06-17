// Model
const mongoose = require('mongoose');

const users_profiles
    = new mongoose.Schema(
    {
        username: {type: String, required: true},
        gender: {type: String},
        birthday: {type: String},
        location: {type: String},
        joined: {type: String},
        watching: {type: Number},
        completed: {type: Number},
        on_hold: {type: Number},
        dropped: {type: Number},
        plan_to_watch: {type: Number},
    }
);

// exporting the model
module.exports = mongoose.model('users_profiles', users_profiles);
