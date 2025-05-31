import React, { useState } from "react";
import { likeAchievement, addComment } from "../services/achievementService"; // Importing the services
import "./AchievementCard.css";

const AchievementCard = ({ achievement }) => {
  const [likes, setLikes] = useState(achievement.likes || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(achievement.comments || []);
  const userType = localStorage.getItem("userType");
  const studentName = localStorage.getItem("username") || "Anonymous";

  const handleLike = async () => {
    try {
      const updatedLikes = await likeAchievement(achievement._id);  // Using service to like
      setLikes(updatedLikes);
    } catch (error) {
      alert("Error liking post: " + error.response?.data?.message || error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        studentName,
        comment,
      };
      const updatedComments = await addComment(achievement._id, newComment);  // Using service to add comment
      setComments(updatedComments);
      setComment("");  // Reset comment field
    } catch (error) {
      alert("Error posting comment: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="achievement-card">
      <h3>{achievement.title}</h3>
      <p><strong>Description:</strong> {achievement.description}</p>
      <p><strong>Category:</strong> {achievement.category}</p>
      <p><strong>Date:</strong> {new Date(achievement.date).toLocaleDateString()}</p>
      <p><strong>Author:</strong> {achievement.author}</p>

      <div className="like-section">
        <button onClick={handleLike} className="like-btn">
          👍 Like ({likes})
        </button>
      </div>

      <div className="comment-section">
        <h4>Comments</h4>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <strong>{comment.studentName}: </strong>{comment.comment}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
