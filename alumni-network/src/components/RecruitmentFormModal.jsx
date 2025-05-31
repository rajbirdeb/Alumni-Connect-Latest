import React, { useState } from "react";
import "./style.css";

const RecruitmentFormModal = ({ onClose, onSubmit }) => {
  const [job, setJob] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "Full-Time",
    description: "",
    requirements: "",
    salary: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...job,
      requirements: job.requirements.split(",").map((req) => req.trim())
    };
    onSubmit(jobData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <input name="jobTitle" placeholder="Job Title" value={job.jobTitle} onChange={handleChange} required />
          <input name="company" placeholder="Company" value={job.company} onChange={handleChange} required />
          <input name="location" placeholder="Location" value={job.location} onChange={handleChange} required />
          <select name="jobType" value={job.jobType} onChange={handleChange}>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
          <textarea name="description" placeholder="Description" value={job.description} onChange={handleChange} required />
          <input name="requirements" placeholder="Requirements (comma-separated)" value={job.requirements} onChange={handleChange} required />
          <input name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RecruitmentFormModal;
