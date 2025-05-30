import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userName = localStorage.getItem('userName');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    // Redirect to home page
    navigate('/');
  };

  const handleEventClick = () => {
    if (role === 'alumni') {
      navigate('/create-event');
    } else {
      navigate('/view-events');
    }
  };

  const handleAlumniClick = () => {
    navigate('/view-alumni');
  };

  return (
    <div className="dashboard-container">
      {/* Add logout button at the top */}
      <button 
        className="logout-button"
        onClick={() => setShowLogoutConfirm(true)}
      >
        Logout
      </button>

      <h1>Welcome{userName ? `, ${userName}` : ''}!</h1>
      <p className="user-role">You are logged in as {role}</p>
      
      <div className="dashboard-buttons">
        <button onClick={handleEventClick} className="dashboard-button">
          {role === 'alumni' ? 'Create Event' : 'View Events'}
        </button>
        <button onClick={handleAlumniClick} className="dashboard-button">
          View Alumni
        </button>
      </div>

      {/* Logout confirmation dialog */}
      {showLogoutConfirm && (
        <div className="logout-confirm-modal">
          <div className="logout-confirm-content">
            <p>Are you sure you want to logout?</p>
            <div className="logout-confirm-buttons">
              <button onClick={handleLogout}>Yes, Logout</button>
              <button onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;