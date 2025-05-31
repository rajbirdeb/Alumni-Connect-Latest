import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";  // Import Sidebar Component
import RecruitmentCard from "../components/RecruitmentCard";  
import RecruitmentFormModal from "../components/RecruitmentFormModal";
import Button from "../components/Button";
import "../styles/RecruitmentPages.css";  // Add the necessary CSS file

const RecruitmentPage = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({});

  const fetchJobs = async (pageNumber = 1) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recruitments`, {
        params: {
          page: pageNumber,
          ...filters
        }
      });
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchJobs(page);  // Fetch filtered jobs
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page, filters]);  // Update when filters or page changes

  const handleJobAdded = async (newJob) => {
    if (page === 1) {
      setJobs((prev) => [newJob, ...prev.slice(0, 9)]);
    } else {
      setPage(1);
    }
    setShowModal(false);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="recruitment-page">
      {/* Sidebar Component */}
      <Sidebar onFilterChange={handleFilterChange} />

      <div className="recruitment-content">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <Button onClick={() => setShowModal(true)}>Post a Job</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <RecruitmentCard key={job._id} job={job} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={handlePrev} disabled={page === 1}>
            Previous
          </Button>
          <span className="self-center">Page {page} of {totalPages}</span>
          <Button onClick={handleNext} disabled={page === totalPages}>
            Next
          </Button>
        </div>

        {/* Modal for Posting Job */}
        {showModal && (
          <RecruitmentFormModal
            onClose={() => setShowModal(false)}
            onSubmit={handleJobAdded}
          />
        )}
      </div>
    </div>
  );
};

export default RecruitmentPage;
