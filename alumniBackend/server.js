const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // No slash!
  credentials: true,
}));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/recruitments", require("./routes/recruitmentRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
