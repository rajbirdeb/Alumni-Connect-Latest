const Achievement = require("../models/Achievement");

// POST - Add Achievement
const addAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json(achievement);
  } catch (error) {
    next(error);
  }
};

// GET - Fetch Achievements with pagination
const getAchievements = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Achievement.countDocuments();
    const achievements = await Achievement.find().skip(skip).limit(limit);

    res.json({ page, limit, total, data: achievements });
  } catch (error) {
    next(error);
  }
};

module.exports = { addAchievement, getAchievements };
