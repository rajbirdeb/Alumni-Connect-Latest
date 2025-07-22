import React, { useState } from "react";
import axios from "axios";
import "../styles/PostRecruitment.css"; // Import the CSS file

const PostRecruitment = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "",
    workMode: "",
    description: "",
    skills: "",
    experienceLevel: "",
    deadline: "",
    applicationLink: "",
    contactEmail: "",
    postedBy: "687c78027904e079044092d4", // dummy alumni ID (replace later)
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()), // convert comma string to array
      };
      await axios.post("http://localhost:5000/api/recruitments", payload);
      setMessage("Job posted successfully!");
      setFormData({
        title: "",
        companyName: "",
        location: "",
        jobType: "",
        workMode: "",
        description: "",
        skills: "",
        experienceLevel: "",
        deadline: "",
        applicationLink: "",
        contactEmail: "",
        postedBy: "687c78027904e079044092d4",
      });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setMessage("Failed to post job");
    }
  };

  return (
    <div className="post-job-container">
      <h1 className="form-title">Post a Job</h1>
      <form className="job-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          name="jobType"
          placeholder="Job Type"
          value={formData.jobType}
          onChange={handleChange}
          required
        />
        <input
          name="workMode"
          placeholder="Work Mode (Remote/Onsite)"
          value={formData.workMode}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />
        <input
          name="experienceLevel"
          placeholder="Experience Level"
          value={formData.experienceLevel}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />
        <input
          name="applicationLink"
          placeholder="Application Link"
          value={formData.applicationLink}
          onChange={handleChange}
        />
        <input
          name="contactEmail"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
        />
        <button type="submit" className="submit-btn">Post Job</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PostRecruitment;
