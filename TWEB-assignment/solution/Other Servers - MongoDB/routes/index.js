const express = require('express');
const router = express.Router();

const user_ratings_controller = require("../controllers/users_ratings");
const user_profile_controller = require("../controllers/users_profiles");
const user_favs_controller = require("../controllers/users_favs");

/* GET home page. */

// 
router.get('/anime/:id/ratings', user_ratings_controller.queryByAnimeId);

router.get('/user/:username/ratings', user_ratings_controller.queryByUsername);

router.get('/user/:username/profile', user_profile_controller.query);

router.get('/user/:username/favs', user_favs_controller.query);




module.exports = router;
