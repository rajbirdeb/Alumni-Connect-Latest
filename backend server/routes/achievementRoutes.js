const express = require("express");
const router = express.Router();
const { addAchievement, getAchievements } = require("../controllers/achievementController");

router.post("/", addAchievement);
router.get("/", getAchievements);

module.exports = router;
