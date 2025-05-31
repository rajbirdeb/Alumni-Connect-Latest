import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage2.css";

const HomePage2 = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const sections = [
    {
      id: 1,
      title: "Events",
      description: "Check out upcoming alumni events.",
      icon: "📅",
    },
    {
      id: 2,
      title: "Alumni Connect",
      description: "Find and connect with alumni.",
      icon: "🤝",
    },
    {
      id: 3,
      title: "Recruitment",
      description: "Explore job opportunities.",
      icon: "💼",
    },
    {
      id: 4,
      title: "Achievements",
      description: "See recent alumni achievements.",
      icon: "🏆",
    },
    {
      id: 5,
      title: "News",
      description: "Get the latest updates.",
      icon: "📰",
    },
    {
      id: 6,
      title: "College Events",
      description: "Upcoming events in the college.",
      icon: "🎓",
    },
  ];

  const scrollToSections = () => {
    document.getElementById("sections").scrollIntoView({ behavior: "smooth" });
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
              <img src={user.profilePictureURL} alt="Profile" className="profile-avatar" />
            ) : (
              <span className="username">{user.username}</span>
            )}
        </div>
         ):(<span className="username">Not logged in</span>)}
         </div>
      </section>

      {/* Sections List */}

      <div id="sections" className="sections-list">
        {sections.map((section) => (
          <div key={section.id} className="section-row">
            <span className="section-icon">{section.icon}</span>
            <div className="section-content">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <Link
              to={`/${section.title.toLowerCase().replace(" ", "")}`}
              className="view-more"
            >
              →
            </Link>
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

// Testimonial Component
const Testimonial = ({ name, quote }) => {
  return (
    <div className="testimonial-item">
      <p>"{quote}"</p>
      <h4>- {name}</h4>
    </div>
  );
};

export default HomePage2;
