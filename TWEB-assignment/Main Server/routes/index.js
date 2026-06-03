const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// MongoDb - express port: 3001
const users_controller = require('../controllers/user');
router.get('/user/:username/profile', users_controller.findByUsername);
router.get('/user/:username/ratings', users_controller.queryRatingsByUser)

// Postgres - Java SpringBoot port: 8082
const anime_controller = require('../controllers/anime');
router.get('/anime/title', anime_controller.findByTitle);
router.get('/anime/top', anime_controller.queryTop);
router.get('/anime/recent', anime_controller.queryRecent);

router.get('/anime/:animeId', anime_controller.findById);
router.get('/anime/:animeId/stats', anime_controller.queryStats);


const actors_controller = require('../controllers/actor');
router.get('/actors/byAnime', actors_controller.queryAnimeVoicesByAnimeId);

module.exports = router;
