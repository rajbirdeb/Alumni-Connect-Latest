import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const RecruitmentCard = ({ job }) => {
  const userType = localStorage.getItem("userType");

  return (
    <div className="job-card">
      <Link to={`/job/${job._id}`} className="job-info">
        <h3 className="job-title">{job.jobTitle}</h3>
        <p className="job-location">{job.location}</p>
        <p className="job-company">{job.company}</p>
      </Link>

      {userType === "student" && (
        <Link to={`/job/${job._id}`} className="apply-button">
          <button className="apply-btn-small">Apply</button>
        </Link>
      )}
    </div>
  );
};

export default RecruitmentCard;
