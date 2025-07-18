const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// GET all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ _id: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// POST a new announcement
router.post('/', async (req, res) => {
  console.log('Received POST request:', req.body); // Add this line
  try {
    const { title, type, description } = req.body;
    const announcement = new Announcement({ title, type, description });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    console.error(err); // Also log the error
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

module.exports = router;
