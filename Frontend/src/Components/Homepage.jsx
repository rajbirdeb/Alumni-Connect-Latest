import { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="logo">Alumni Connect</h1>
          <div className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/about" className="nav-item">About</Link>
            <Link to="/register" className="nav-item">SignUp</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h2>Welcome to Alumni Connect</h2>
          <p>Reconnect. Network. Grow Together.</p>
        </div>
      </header>

      {/* Full-width Carousel Section */}
      <section className="full-width-carousel">
        <Carousel 
          showThumbs={false} 
          autoPlay 
          infiniteLoop 
          interval={5000}
          showStatus={false}
          showArrows={true}
          stopOnHover={false}
        >
          <div className="carousel-slide">
            <img src="/images/event1.jpg" alt="Annual Alumni Meet" />
            <div className="carousel-overlay">
              <h3>Annual Alumni Meet 2024</h3>
              <p>Join us for the biggest reunion of the year</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="/images/event2.jpg" alt="Guest Talk" />
            <div className="carousel-overlay">
              <h3>Guest Talk by Distinguished Alumni</h3>
              <p>Learn from the success stories of our alumni</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="/images/event3.jpg" alt="Networking Session" />
            <div className="carousel-overlay">
              <h3>Career Networking Session</h3>
              <p>Connect with industry leaders and peers</p>
            </div>
          </div>
        </Carousel>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="content-wrapper">
          <h2>Why Join Alumni Connect?</h2>
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Network</h3>
              <p>Connect with alumni across industries and generations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Opportunities</h3>
              <p>Discover career opportunities and mentorship programs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Give Back</h3>
              <p>Support current students and your alma mater</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Alumni Connect. All Rights Reserved.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;