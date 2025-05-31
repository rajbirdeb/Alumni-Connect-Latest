const express = require("express");
const router = express.Router();
const {
  addAchievement,
  getAllAchievements,
  likeAchievement,
  addComment
} = require("../controllers/achievementController");

router.post("/", addAchievement);
router.get("/", getAllAchievements);
router.post("/like", likeAchievement);
router.post("/comment", addComment);

module.exports = router;
