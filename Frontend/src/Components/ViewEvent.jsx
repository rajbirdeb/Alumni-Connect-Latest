// ViewEvents.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewEvent.css';
import axios from 'axios';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchEvents = async () => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('userId');
          navigate('/login');
        } else {
          setError('Failed to fetch events');
          setLoading(false);
          console.error('Error fetching events:', err);
        }
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/events/${eventId}/register`,
        { userId: localStorage.getItem('userId') },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert('Registration successful!');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-events-container">
      <div className="view-events-header">
        <h2>Upcoming Events</h2>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>
      
      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-card-header">
                <h3>{event.name}</h3>
              </div>
              <div className="event-card-body">
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <p><span className="detail-label">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
                  <p><span className="detail-label">Time:</span> {event.time}</p>
                  <p><span className="detail-label">Location:</span> {event.location}</p>
                </div>
              </div>
              <div className="event-card-footer">
                <button 
                  onClick={() => handleRegister(event._id)} 
                  className="register-button"
                >
                  Register
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No upcoming events found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewEvents;