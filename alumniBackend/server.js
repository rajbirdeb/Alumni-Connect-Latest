const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());  // For parsing application/json
app.use(cors());          // Enable CORS for all routes

// Routes
const recruitmentRoutes = require('./routes/recruitmentRoutes');
const achievementRoutes = require('./routes/achievementRoutes');

app.use('/api/recruitment', recruitmentRoutes);
app.use('/api/achievements', achievementRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
