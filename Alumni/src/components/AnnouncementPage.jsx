import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AnnouncementPage.css';

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="announcement-page">
      <h2 className="announcement-title">Latest Announcements</h2>
      <div className="announcement-grid">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-card">
            <h3>{announcement.title}</h3>
            <p><strong>Type:</strong> {announcement.type}</p>
            <p>{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementPage;
