import axios from 'axios';

// Define the base URL for API requests
const API_URL = "http://localhost:5000/api/";

// Fetch all achievements
export const getAchievements = async () => {
  try {
    const response = await axios.get(`${API_URL}achievements`);
    return response.data;  // return the data from the response
  } catch (error) {
    console.error("Error fetching achievements:", error);
    throw error;
  }
};

// Add a new achievement
export const addAchievement = async (newAchievement) => {
  try {
    const response = await axios.post(`${API_URL}achievements`, newAchievement);
    return response.data;  // return the newly added achievement
  } catch (error) {
    console.error("Error adding achievement:", error);
    throw error;
  }
};

// Like an achievement
export const likeAchievement = async (achievementId) => {
  try {
    const response = await axios.post(`${API_URL}like`, { achievementId });
    return response.data.likes;  // return the updated like count
  } catch (error) {
    console.error("Error liking achievement:", error);
    throw error;
  }
};

// Add a comment to an achievement
export const addComment = async (achievementId, comment) => {
  try {
    const response = await axios.post(`${API_URL}comment`, {
      achievementId,
      comment
    });
    return response.data.comments;  // return the updated comments array
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};
