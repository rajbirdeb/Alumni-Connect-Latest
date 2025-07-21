const Recruitment = require("../models/Recruitment");

// POST - Add Recruitment
const addRecruitment = async (req, res, next) => {
  try {
    const recruitment = await Recruitment.create(req.body);
    res.status(201).json(recruitment);
  } catch (error) {
    next(error);
  }
};

// GET - Fetch Recruitments with pagination
const getRecruitments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Recruitment.countDocuments();
    const recruitments = await Recruitment.find().skip(skip).limit(limit);

    res.json({ page, limit, total, data: recruitments });
  } catch (error) {
    next(error);
  }
};

module.exports = { addRecruitment, getRecruitments };
