// models/Achievement.js

const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
