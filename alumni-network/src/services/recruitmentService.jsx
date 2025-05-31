import axios from "axios";
const API_URL = "http://localhost:5000/api/recruitments";

export const getAllJobs = async (page = 1, limit = 10) => {
  const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return res.data;
};

export const getJobById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const postJob = async (jobData) => {
  const res = await axios.post(API_URL, jobData);
  return res.data;
};
