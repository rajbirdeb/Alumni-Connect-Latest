import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar"; // Assuming you use the same Sidebar
import '../styles/AchievementList.css';

const AchievementList = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state

  const achievementFilters = [
    {
      label: "Year",
      name: "year",
      type: "number",
      placeholder: "Enter year",
    },
    {
      label: "Achieved By",
      name: "achievedBy",
      type: "text",
      placeholder: "Enter name",
    }
  ];

  const [filters, setFilters] = useState({
    year: "",
    achievedBy: "",
  });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/achievements?page=1&limit=10");
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const result = await response.json();
        setAchievements(result.data || []);
      } catch (err) {
        console.error("Error fetching achievements", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const filteredAchievements = achievements.filter((ach) => {
    return (
      (filters.year ? new Date(ach.date).getFullYear() === parseInt(filters.year) : true) &&
      (filters.achievedBy
        ? ach.achievedBy?.toLowerCase().includes(filters.achievedBy.toLowerCase())
        : true)
    );
  });

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="achievement-page">
      {/* Hamburger Button */}
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        &#9776; {/* Three-line icon */}
      </button>

      {/* Sidebar - toggleable */}
      {sidebarOpen && (
        <Sidebar filters={achievementFilters} onFilterChange={setFilters} />
      )}

      <div className="achievement-container">
        <h1 className="achievement-heading">Achievements</h1>
        <div className="achievement-grid">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((ach) => (
              <div key={ach._id} className="achievement-card">
                <h2 className="achievement-title">{ach.title}</h2>
                <p className="achievement-description">{ach.description}</p>
                <p className="achievement-date">
                  {ach.date ? new Date(ach.date).toLocaleDateString() : ""}
                </p>
                <p className="achievement-by">By: {ach.achievedBy || "N/A"}</p>
              </div>
            ))
          ) : (
            <p className="no-achievements">No achievements found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementList;
