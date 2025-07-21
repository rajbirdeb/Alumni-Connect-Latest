import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home2.css";

const Testimonial = ({ name, quote }) => {
  return (
    <div className="testimonial-item">
      <p>"{quote}"</p>
      <h4>- {name}</h4>
    </div>
  );
};

const Home2 = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // For testing without login:
    // Comment this out later when integrating real login
    const tempUser = { username: "Test User", role: "alumni" }; // change role to "alumni" for testing
    localStorage.setItem("user", JSON.stringify(tempUser));

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // ====== WHEN YOU GET LOGIN/JWT CODE ======
    // Replace the above logic with something like:
    // const token = localStorage.getItem("token");
    // if (token) {
    //   fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` }})
    //     .then(res => res.json())
    //     .then(data => setUser(data));
    // }
  }, []);

  // Sections (dynamic recruitment section based on role)
  const sections = [
    {
      id: 1,
      title: "Events",
      description: "Check out upcoming alumni events.",
      icon: "📅",
      path: "/events",
    },
    {
      id: 2,
      title: "Alumni Connect",
      description: "Find and connect with alumni.",
      icon: "🤝",
      path: "/alumniconnect",
    },
    {
      id: 3,
      title: user?.role === "alumni" ? "Post Recruitment" : "Recruitment List",
      description:
        user?.role === "alumni"
          ? "Post job opportunities for students."
          : "Explore available job openings.",
      icon: "💼",
      path: user?.role === "alumni" ? "/post-recruitment" : "/recruitments",
    },
    {
      id: 4,
      title: user?.role === "alumni" ? "Post Achievement" : "Achievements",
      description: "See recent alumni achievements.",
      icon: "🏆",
      path: user?.role === "alumni" ? "/post-achievement" : "/achievements",
    },
    {
      id: 5,
      title: "News",
      description: "Get the latest updates.",
      icon: "📰",
      path: "/news",
    },
    {
      id: 6,
      title: "College Events",
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
          {user ? (
            <div className="user-info">
              {user.profilePictureURL ? (
                <img
                  src={user.profilePictureURL}
                  alt="Profile"
                  className="profile-avatar"
                />
              ) : (
                <span className="username">{user.username}</span>
              )}
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

export default Home2;
