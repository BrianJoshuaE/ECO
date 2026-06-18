import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axiosInstance.get('/feedback');
        setFeedback(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/feedback', { comment, rating, jobId: null });
      setComment('');
      setRating(5);
      alert('Feedback submitted');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feedback-page">
      <h1>Feedback</h1>
      <div className="feedback-grid">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h2>Submit Feedback</h2>
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <label>Comment</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required />
          <button type="submit" className="btn-primary">Submit</button>
        </form>
        <div className="feedback-list">
          <h2>Recent Feedback</h2>
          {feedback.map((item) => (
            <div key={item.id} className="feedback-item">
              <strong>{item.rating} Stars</strong>
              <p>{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
