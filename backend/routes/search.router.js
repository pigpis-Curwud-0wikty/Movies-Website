const express = require("express");
const {
  searchMovie,
  searchPerson,
  searchTv,
  searchHistory,
  deleteItemFromSearchHistory,
} = require("../controllers/search.controller");
const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", searchHistory);
router.delete("/history/:id", deleteItemFromSearchHistory);

module.exports = router;
