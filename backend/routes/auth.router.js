const express = require("express");
const {
  login,
  signup,
  logout,
  authCheck,
} = require("../controllers/auth.controller");

const { protectRoute } = require("../middleware/protectRoute");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authcheck", protectRoute, authCheck);

module.exports = router;
