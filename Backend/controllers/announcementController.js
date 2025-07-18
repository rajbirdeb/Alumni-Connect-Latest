const Announcement = require('../models/Announcement');

// Admin: Create announcement
exports.createAnnouncement = async (req, res) => {
  const { title, type, content } = req.body;
  try {
    const newAnnouncement = new Announcement({ title, type, content });
    await newAnnouncement.save();
    res.status(201).json({ message: 'Announcement created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Students/Alumni: Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
