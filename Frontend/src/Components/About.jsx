import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About AlumniConnect</h1>
        <p className="tagline">Bridging the gap between past, present, and future</p>
      </header>

      <main className="about-content">
        <section className="mission-section">
          <div className="section-icon">🎯</div>
          <h2>Our Mission</h2>
          <p>
            AlumniConnect is dedicated to fostering lifelong connections between alumni and their alma mater. 
            We provide a platform for networking, mentorship, and professional growth while supporting current students.
          </p>
        </section>

        <section className="features-section">
          <h2>Why Join Our Community?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Networking</h3>
              <p>Connect with alumni across industries and generations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Events</h3>
              <p>Attend reunions, workshops, and career fairs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Opportunities</h3>
              <p>Discover job openings and mentorship programs.</p>
            </div>
          </div>
        </section>

        <section className="success-stories-section">
          <h2>Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <p className="story-text">
                "Through AlumniConnect, I reconnected with mentors who helped me land my dream job at a top tech company!"
              </p>
              <p className="story-author">- Priya Sharma, Batch of 2018</p>
            </div>
            <div className="story-card">
              <p className="story-text">
                "Organizing alumni workshops gave me exposure and eventually a chance to start my own startup."
              </p>
              <p className="story-author">- Rohan Verma, Batch of 2015</p>
            </div>
            <div className="story-card">
              <p className="story-text">
                "Being a mentor to current students has been a fulfilling experience, thanks to this amazing platform."
              </p>
              <p className="story-author">- Aisha Khan, Batch of 2012</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <p>Ready to join our growing community?</p>
        <button className="cta-button" onClick={() => navigate('/login')}>Get Started</button>
      </footer>
    </div>
  );
};

export default About;
