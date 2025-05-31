const mongoose = require('mongoose');

const recruitmentSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
      required: true,
      set: (value) => value.toLowerCase()  // This converts "Full-time" -> "full-time"
    },
    
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    salary: { type: String },
    postedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recruitment', recruitmentSchema);
