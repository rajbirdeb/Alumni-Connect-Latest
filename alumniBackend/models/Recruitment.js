const mongoose = require("mongoose");

const recruitmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: String,
    jobType: String,
    workMode: String,
    description: String,
    skills: [String],
    experienceLevel: String,
    deadline: Date,
    applicationLink: String,
    contactEmail: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recruitment", recruitmentSchema);
