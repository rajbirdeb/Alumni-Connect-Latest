import React from "react";
import "./style.css";

const Sidebar = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sidebar-container">
      <h2>Filters</h2>
      <label>Job Type:</label>
      <select name="jobType" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
      </select>

      <label>Location:</label>
      <input type="text" name="location" placeholder="Enter location" onChange={handleFilterChange} />

      <label>Experience:</label>
      <input type="number" name="experience" placeholder="Years of experience" onChange={handleFilterChange} />
    </div>
  );
};

export default Sidebar;
