import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import axios from 'axios';

const Registration = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Enhanced validation
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/register', {
        ...formData,
        userType
      });
  
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', userType);
        localStorage.setItem('userId', response.data.userId);
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="registration-background">
      <div className="auth-container signup-container">
        <h2>Signup</h2>
        <div className="toggle-buttons">
          <button
            className={userType === 'student' ? 'active' : ''}
            onClick={() => handleUserTypeChange('student')}
          >
            Student
          </button>
          <button
            className={userType === 'alumni' ? 'active' : ''}
            onClick={() => handleUserTypeChange('alumni')}
          >
            Alumni
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            I agree to the terms and conditions
          </label>
          <button type="submit">Signup</button>
        </form>
        <button
          className="login-button"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Registration;
