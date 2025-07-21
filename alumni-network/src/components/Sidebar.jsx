import React from "react";
import "./Sidebar.css";

const Sidebar = ({ filters, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Filters</h2>
      {filters.map((filter, index) => (
        <div key={index} className="sidebar-filter">
          <label className="sidebar-label">{filter.label}:</label>
          {filter.type === "select" ? (
            <select name={filter.name} onChange={handleFilterChange} className="sidebar-input">
              {filter.options.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type}
              name={filter.name}
              placeholder={filter.placeholder}
              onChange={handleFilterChange}
              className="sidebar-input"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
