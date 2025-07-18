require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/announcements', announcementRoutes);

const PORT =process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
