const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('./Models/UserModel.js');
const Event = require('./Models/EventModel.js');
const auth = require('./middleware/auth.js');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
  origin: "*"
}));

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB Atlas:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the AlumniConnect API');
});


// User Registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword, agreeToTerms, userType } = req.body;

    if (!name || !email || !phone || !password || !confirmPassword || !userType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or phone already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
      agreeToTerms,
    });

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ 
      message: 'Login successful', 
      token,
      role: user.userType,
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// User Profile
app.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Event Routes
app.post('/events', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can create events' });
    }

    const { name, description, date, time, location, visibleToStudents = true } = req.body;
    const event = new Event({
      name,
      description,
      date,
      time,
      location,
      createdBy: req.user.id,
      visibleToStudents
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
});

// Get Events (with visibility control)
app.get('/events', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const query = user.userType === 'student' 
      ? { visibleToStudents: true } 
      : {};
    
    const events = await Event.find(query)
      .populate('createdBy', 'name')
      .sort({ date: 1 }); // Sort by date ascending
      
    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

// Event Registration
app.post('/events/:eventId/register', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'student') {
      return res.status(403).json({ message: 'Only students can register for events' });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.registeredUsers.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    event.registeredUsers.push(req.user.id);
    user.registeredEvents.push(event._id);

    await event.save();
    await user.save();

    res.json({ 
      message: 'Registered for event successfully', 
      event: {
        id: event._id,
        name: event.name,
        date: event.date
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register for event', error: err.message });
  }
});

// Alumni's Created Events
app.get('/my-events', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can view created events' });
    }

    const events = await Event.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });
    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your events', error: err.message });
  }
});

// Student's Registered Events
app.get('/registered-events', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'registeredEvents',
      populate: { path: 'createdBy', select: 'name' }
    });
    
    if (user.userType !== 'student') {
      return res.status(403).json({ message: 'Only students can view registered events' });
    }

    res.json({ events: user.registeredEvents });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch registered events', error: err.message });
  }
});

// Add this to your server.js after the other routes

// Get all alumni profiles
app.get('/alumni', auth, async (req, res) => {
  try {
    const alumni = await User.find({ userType: 'alumni' })
      .select('-password -registeredEvents -agreeToTerms -__v');
    
    res.json({ alumni });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch alumni', error: err.message });
  }
});



// Update alumni profile with photo upload
app.put('/alumni/profile', auth, upload.single('profilePhoto'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can update alumni profiles' });
    }

    const { batchYear, currentJob, company, bio } = req.body;
    const updateData = {
      batchYear,
      currentJob,
      company,
      bio
    };

    // If file was uploaded, add the path to updateData
    if (req.file) {
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select('-password -registeredEvents -agreeToTerms -__v');

    res.json({ 
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
});

// recruitment and achievement routes
app.use("/api/recruitments", require("./routes/recruitmentRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));

// annoucement route
app.use('/api/announcements', require("./routes/announcementRoutes"));
// Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

