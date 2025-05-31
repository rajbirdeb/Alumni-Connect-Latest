const Achievement = require("../models/Achievement");

exports.addAchievement = async (req, res) => {
  try {
    const newAchievement = new Achievement(req.body);
    await newAchievement.save();
    res.status(201).json({ message: "Achievement added", achievement: newAchievement });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeAchievement = async (req, res) => {
  try {
    const { achievementId } = req.body;
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) return res.status(404).json({ error: "Achievement not found" });

    achievement.likes += 1;
    await achievement.save();
    res.status(200).json({ message: "Achievement liked", likes: achievement.likes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { achievementId, comment } = req.body;
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) return res.status(404).json({ error: "Achievement not found" });

    achievement.comments.push({ text: comment });
    await achievement.save();
    res.status(200).json({ message: "Comment added", comments: achievement.comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
