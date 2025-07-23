import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewAlumini.css';
import axios from 'axios';

const ViewAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  const baseURL = import.meta.env.VITE_API_BASE_URL;


  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseURL}/alumni`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAlumni(response.data.alumni);
      setError('');
    } catch (err) {
      setError('Failed to fetch alumni data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    fetchAlumni();

    // Refresh when coming back from edit profile
    if (location.state?.refresh) {
      fetchAlumni();
      // Clear the refresh state to prevent infinite loops
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.refresh, navigate, location.pathname]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-alumni-container">
      <h1>Our Alumni Network</h1>
      <div className="alumni-grid">
        {alumni.map(alum => (
          <div key={alum._id} className="alumni-card">
            <div className="alumni-card-header">
              {alum.profilePhoto ? (
                <img 
                  src={`${baseURL}${alum.profilePhoto}`}
                  alt={alum.name} 
                  className="alumni-photo" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '';
                    e.target.parentNode.innerHTML = `
                      <div class="alumni-photo-placeholder">
                        ${alum.name.charAt(0).toUpperCase()}
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="alumni-photo-placeholder">
                  {alum.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="alumni-card-body">
              <h3>{alum.name}</h3>
              <p><strong>Batch:</strong> {alum.batchYear || 'Not specified'}</p>
              <p><strong>Current Role:</strong> {alum.currentJob || 'Not specified'}</p>
              <p><strong>Company:</strong> {alum.company || 'Not specified'}</p>
              {alum.bio && <p className="alumni-bio">{alum.bio}</p>}
            </div>
            {role === 'alumni' && userId === alum._id && (
              <button 
                onClick={() => navigate('/edit-profile', { state: { from: location } })}
                className="edit-profile-btn"
              >
                Edit Profile
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAlumni;