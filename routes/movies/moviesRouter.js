const express = require('express');
const router = express.Router();
const { jwtMiddleware } = require('../users/lib/authMiddleware');
const { addToFavorites, getAllFavoriteMovies } = require('./controller/movieController');

router.post(
  "/add-to-favorites",
  jwtMiddleware,
  addToFavorites,
);

router.get(
  "/get-all-favorite-movies",
  jwtMiddleware,
  getAllFavoriteMovies,
)

module.exports = router;