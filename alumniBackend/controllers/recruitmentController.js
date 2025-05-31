const Recruitment = require("../models/Recruitment");

exports.addJob = async (req, res) => {
  try {
    const job = new Recruitment(req.body);
    await job.save();
    res.status(201).json({ message: "Job added", data: job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.bulkInsert = async (req, res) => {
  try {
    const jobs = await Recruitment.insertMany(req.body);
    res.status(201).json({ message: "Jobs inserted", data: jobs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const totalJobs = await Recruitment.countDocuments();
    const jobs = await Recruitment.find().skip(skip).limit(Number(limit));

    const totalPages = Math.ceil(totalJobs / limit);
    res.status(200).json({ jobs, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Recruitment.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job details" });
  }
};
