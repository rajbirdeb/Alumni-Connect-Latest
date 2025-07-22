import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Testimonial = ({ name, quote }) => {
  return (
    <div className="testimonial-item">
      <p>"{quote}"</p>
      <h4>- {name}</h4>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const sections = [
    {
      id: 1,
      title: role === "alumni" ? "Create Event" : "View Events",
      description: "Check out upcoming alumni events.",
      icon: "📅",
      path: role === "alumni" ? "/create-event" : "/view-events",
    },
    {
      id: 2,
      title: "Alumni Connect",
      description: "Find and connect with alumni.",
      icon: "🤝",
      path: "/view-alumni",
    },
    {
      id: 3,
      title: role === "alumni" ? "Post Recruitment" : "Recruitment List",
      description:
        role === "alumni"
          ? "Post job opportunities for students."
          : "Explore available job openings.",
      icon: "💼",
      path: role === "alumni" ? "/post-recruitment" : "/recruitments",
    },
    {
      id: 4,
      title: role === "alumni" ? "Post Achievement" : "Achievements",
      description: "See recent alumni achievements.",
      icon: "🏆",
      path: role === "alumni" ? "/post-achievement" : "/achievements",
    },
    {
      id: 5,
      title: "Announcements",
      description: "Get the latest updates.",
      icon: "📰",
      path: "/announcements",
    },
    {
      id: 6,
      title: "LeaderBoard",
      description: "Upcoming events in the college.",
      icon: "🎓",
      path: "/collegeevents",
    },
  ];

  const scrollToSections = () => {
    document.getElementById("sections").scrollIntoView({ behavior: "smooth" });
  };

  const handleSectionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage-container">
      {/* logout section */}
      <div className="dashboard-container">
        <button
          className="logout-button"
          onClick={() => setShowLogoutConfirm(true)}
        >
          Logout
        </button>

        <h1>Welcome{userName ? `, ${userName}` : ""}!</h1>
        <p className="user-role">You are logged in as {role}</p>

        {showLogoutConfirm && (
          <div className="logout-confirm-modal">
            <div className="logout-confirm-content">
              <p>Are you sure you want to logout?</p>
              <div className="logout-confirm-buttons">
                <button onClick={handleLogout}>Yes, Logout</button>
                <button onClick={() => setShowLogoutConfirm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>"Stay Connected, Grow Together!"</h1>
          <p>Discover opportunities, events, and alumni connections.</p>

          <button className="explore-btn" onClick={scrollToSections}>
            Start Exploring
          </button>
        </div>
        <div className="hero-right">
          {userName ? (
            <div className="user-info">
              <div className="avatar-circle">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="username">{userName}</span>
            </div>
          ) : (
            <span className="username">Not logged in</span>
          )}
        </div>
      </section>

      {/* Sections List */}
      <div id="sections" className="sections-list">
        {sections.map((section) => (
          <div
            key={section.id}
            className="section-row"
            onClick={() => handleSectionClick(section.path)}
            style={{ cursor: "pointer" }}
          >
            <span className="section-icon">{section.icon}</span>
            <div className="section-content">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Alumni Say</h2>
        <div className="testimonial-list">
          <Testimonial
            name="Rahul Sharma"
            quote="Alumni Connect helped me get my first job!"
          />
          <Testimonial
            name="Ananya Verma"
            quote="I found so many old friends here!"
          />
          <Testimonial
            name="Karan Mehta"
            quote="Great way to stay updated on alumni events!"
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest news and events.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;
