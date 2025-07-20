const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: Date,
    achievedBy: { type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
