import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AchievementCard from "../components/AchievementCard";
import AchievementFormModal from "../components/AchievementFormModal";
import axios from "axios";
import "../styles/AchievementPages.css";

const AchievementPages = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const type = localStorage.getItem("userType");
    setUserType(type);

    axios
      .get("http://localhost:5000/api/achievements")
      .then((res) => setAchievements(res.data))
      .catch((err) => console.error("Error fetching achievements:", err));
  }, []);

  const addAchievement = async (newItem) => {
    try {
      const res = await axios.post("http://localhost:5000/api/achievements", newItem);
      setAchievements([...achievements, res.data.achievement]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`achievement-container ${darkMode ? "dark" : ""}`}>
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <Sidebar />
      </div>

      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Achievements</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />{" "}
              Dark Mode
            </label>

            {userType === "alumni" && (
              <button className="post-achievement-btn" onClick={() => setIsModalOpen(true)}>
                + Post Achievement
              </button>
            )}
          </div>
        </div>

        <div className="achievement-list">
          {achievements.length > 0 ? (
            achievements.map((item) => (
              <AchievementCard key={item._id} achievement={item} />
            ))
          ) : (
            <p>No achievements posted yet.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AchievementFormModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={addAchievement}
        />
      )}
    </div>
  );
};

export default AchievementPages;
