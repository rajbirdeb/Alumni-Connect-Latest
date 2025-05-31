import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", resume: "" });
  const [saved, setSaved] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recruitment/${id}`)
      .then((response) => setJob(response.data))
      .catch((error) => console.error("Error fetching job details:", error));

    const type = localStorage.getItem("userType");
    setUserType(type);
  }, [id]);

  const handleSaveJob = () => {
    setSaved(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted:", formData);
    setShowForm(false);
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details-container">
      <h1>{job.jobTitle}</h1>
      <h3>{job.company}</h3>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.jobType}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Requirements:</strong> {job.requirements.join(", ")}</p>
      <p><strong>Salary:</strong> {job.salary}</p>

      {userType === "student" && (
        <>
          <button onClick={() => setShowForm(true)} className="apply-btn">Apply Now</button>
          <button
            onClick={handleSaveJob}
            className={`save-btn ${saved ? "saved" : ""}`}
          >
            {saved ? "Saved" : "Save Job"}
          </button>
        </>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="apply-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="text"
            name="resume"
            placeholder="Resume Link"
            onChange={handleChange}
            value={formData.resume}
            required
          />
          <button type="submit" className="submit-btn">Submit Application</button>
        </form>
      )}
    </div>
  );
};

export default JobDetails;
