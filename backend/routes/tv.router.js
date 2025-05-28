const express = require("express");
const {
  getTrendingTv,
  getTvTrailer,
  getTvDetails,
  getSimilarTv,
  getTvByCategory,
} = require("../controllers/tv.controller.js");

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailer);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvByCategory);

module.exports = router;
