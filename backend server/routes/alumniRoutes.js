const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { getAllAlumni, updateProfile } = require('../controllers/alumniController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/', auth, getAllAlumni);
router.put('/profile', auth, upload.single('profilePhoto'), updateProfile);

module.exports = router;
