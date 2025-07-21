import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    batchYear: '',
    currentJob: '',
    company: '',
    bio: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData({
          batchYear: res.data.batchYear || '',
          currentJob: res.data.currentJob || '',
          company: res.data.company || '',
          bio: res.data.bio || ''
        });

        if (res.data.profilePhoto) {
          setPreview(`http://localhost:5000${res.data.profilePhoto}`);
        }
      } catch (err) {
        setError('Failed to fetch profile data');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      // Append all fields
      formDataToSend.append('batchYear', formData.batchYear);
      formDataToSend.append('currentJob', formData.currentJob);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('bio', formData.bio);
      
      if (selectedFile) {
        formDataToSend.append('profilePhoto', selectedFile);
      }

      const response = await axios.put('http://localhost:5000/alumni/profile', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Update successful:', response.data);
      navigate('/view-alumni', { 
        state: { 
          refresh: true,
          updatedProfile: response.data.user 
        } 
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.errors?.join(', ') || 
                         'Profile update failed';
      setError(errorMessage);
      console.error('Update error:', err.response?.data || err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner"></div>;

  return (
    <div className="edit-profile-container">
      <h1>Edit Your Profile</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-image-section">
          <div className="image-preview">
            {preview ? (
              <img src={preview} alt="Profile preview" className="preview-image" />
            ) : (
              <div className="preview-initials">
                {localStorage.getItem('name')?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="file-input-container">
            <label className="file-input-label">
              Choose Photo
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="file-input"
              />
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Batch Year</label>
          <input
            type="number"
            name="batchYear"
            value={formData.batchYear}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label>Current Job</label>
          <input
            type="text"
            name="currentJob"
            value={formData.currentJob}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            maxLength="500"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="save-btn"
            disabled={saveLoading}
          >
            {saveLoading ? (
              <>
                <span className="spinner"></span> Saving...
              </>
            ) : 'Save Changes'}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/view-alumni')}
            disabled={saveLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;