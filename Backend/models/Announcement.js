const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
