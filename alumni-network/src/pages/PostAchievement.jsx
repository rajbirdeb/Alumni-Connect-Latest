import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostAchievement.css'; // Import the CSS file

const PostAchievement = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    achievedBy: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/achievements", form);
      setMessage("Achievement posted successfully!");
      setForm({ title: "", description: "", date: "", achievedBy: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to post achievement.");
    }
  };

  return (
    <div className="achievement-container">
      <h1 className="achievement-title">Post Achievement</h1>
      {message && <p className="achievement-message">{message}</p>}
      <form onSubmit={handleSubmit} className="achievement-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="achievement-input"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="achievement-textarea"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="achievement-input"
        />
        <input
          type="text"
          name="achievedBy"
          placeholder="Achieved By"
          value={form.achievedBy}
          onChange={handleChange}
          className="achievement-input"
        />
        <button
          type="submit"
          className="achievement-button"
        >
          Post Achievement
        </button>
      </form>
    </div>
  );
};

export default PostAchievement;
