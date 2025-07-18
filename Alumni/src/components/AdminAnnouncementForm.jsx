import React, { useState } from 'react';
import axios from 'axios';
import './AdminAnnouncementForm.css';

const AdminAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/announcements', formData);
      alert('Announcement created successfully!');
      setFormData({ title: '', description: '' });
    } catch (error) {
      alert('Error creating announcement');
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">Create New Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label className="admin-form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="admin-form-input"
            required
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="admin-form-textarea"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="admin-form-button">Submit</button>
      </form>
    </div>
  );
};

export default AdminAnnouncementForm;
