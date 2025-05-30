// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ['student', 'alumni'] },
  agreeToTerms: { type: Boolean, required: true },
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  createdAt: { type: Date, default: Date.now },
  // Add alumni-specific fields
  batchYear: { type: Number },
  currentJob: { type: String },
  company: { type: String },
  profilePhoto: { type: String }, // URL to the profile photo
  bio: { type: String },
  // Add student-specific fields if needed
  studentId: { type: String },
  graduationYear: { type: Number }
});

const User = mongoose.model('User', userSchema);

module.exports = User;