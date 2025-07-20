import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Sidebar component
import "../styles/RecruitmentList.css";

const RecruitmentList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    experience: ""
  });
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state

  const recruitmentFilters = [
    {
      label: "Job Type",
      name: "jobType",
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
      ],
    },
    {
      label: "Location",
      name: "location",
      type: "text",
      placeholder: "Enter location",
    },
    {
      label: "Experience",
      name: "experience",
      type: "number",
      placeholder: "Years of experience",
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/recruitments?page=1&limit=10"
        );
        if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);

        const data = await res.json();
        setJobs(data.data || []);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.jobType ? job.jobType === filters.jobType : true) &&
      (filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true) &&
      (filters.experience
        ? job.experienceRequired <= parseInt(filters.experience)
        : true)
    );
  });

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="recruitment-page">
      {/* Hamburger Button */}
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        &#9776; {/* Three-line menu icon */}
      </button>

      {/* Sidebar - conditionally rendered */}
      {sidebarOpen && (
        <Sidebar filters={recruitmentFilters} onFilterChange={setFilters} />
      )}

      <div className="recruitment-container">
        <h1 className="recruitment-heading">Job Openings</h1>
        {filteredJobs.length === 0 ? (
          <p className="no-jobs">No jobs match your filters.</p>
        ) : (
          <ul className="recruitment-list">
            {filteredJobs.map((job) => (
              <li key={job._id} className="job-card">
                <h3 className="job-title">{job.title}</h3>
                <p>
                  <strong>Company:</strong> {job.companyName}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Type:</strong> {job.jobType} ({job.workMode})
                </p>
                <p className="job-description">
                  <strong>Description:</strong> {job.description}
                </p>
                <p>
                  <strong>Skills:</strong> {job.skills.join(", ")}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {job.deadline ? new Date(job.deadline).toDateString() : "N/A"}
                </p>
                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="apply-btn"
                >
                  Apply Here
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecruitmentList;
