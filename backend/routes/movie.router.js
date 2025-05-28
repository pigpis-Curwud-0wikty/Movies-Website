const express = require("express");
const {
  getTrendingMovie,
  getMovieTrailer,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
} = require("../controllers/movie.controller.js");

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

module.exports = router;
