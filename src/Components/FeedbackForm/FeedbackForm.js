import React, { useState } from 'react';
import './FeedbackForm.css'; // Import CSS file for styling

const FeedbackForm = ({ onClose, doctor, onSubmit }) => {
  const [feedbackData, setFeedbackData] = useState({
    fullName: '',
    feedback: '',
    rating: 3 // Initial rating set to 3 (or any default value)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value
    });
  };

  const handleRatingChange = (e) => {
    const rating = parseFloat(e.target.value).toFixed(1); // Convert to float and fix to 1 decimal place
    setFeedbackData({
      ...feedbackData,
      rating: parseFloat(rating)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle feedback submission (e.g., API call)
    console.log('Submitting feedback:', feedbackData);

    // Call onSubmit prop to pass data back to ReviewForm
    onSubmit(feedbackData.feedback, feedbackData.rating);

    // Reset form fields after submission if needed
    setFeedbackData({
      fullName: '',
      feedback: '',
      rating: 3 // Reset rating to default after submission
    });

    // Close the form after submission
    onClose();
  };

  return (
    <div className="feedback-form-modal">
      <h2>Provide feedback about {doctor.doctorName}</h2>
      <h3 style={{ marginBottom: '20px' }}>Specialty: {doctor.doctorSpeciality}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Reviewer Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={feedbackData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedbackData.feedback}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rate the doctor (1 - 5):</label>
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            step="0.1" // Step attribute set to 0.1 for incremental changes
            value={feedbackData.rating}
            onChange={handleRatingChange}
            required
          />
          <span>{feedbackData.rating}</span>
        </div>
        <button type="submit">Submit Feedback</button>
        <button onClick={onClose} style={{ backgroundColor: 'red' }}>Close</button>
      </form>
    </div>
  );
};

export default FeedbackForm;