import React, { useState } from 'react';
import './ReviewForm.css'; // Import CSS file for styling
import FeedbackForm from '../FeedbackForm/FeedbackForm'; // Import FeedbackForm component

const ReviewForm = () => {
  // State to manage the list of reviews
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: 'Dr. John Doe', doctorSpeciality: 'Cardiologist', feedback: '', rating: null, reviewGiven: false },
    { id: 2, doctorName: 'Dr. Jane Smith', doctorSpeciality: 'Dermatologist', feedback: '', rating: null, reviewGiven: false },
    { id: 3, doctorName: 'Dr. Mike Johnson', doctorSpeciality: 'Pediatrician', feedback: '', rating: null, reviewGiven: false }
    // Add more initial data as needed
  ]);

  // State to manage whether to show the feedback form popup
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track which doctor's feedback is being given

  // Function to handle opening the feedback form popup
  const openFeedbackForm = (id) => {
    const doctor = reviews.find(review => review.id === id);
    setSelectedDoctor(doctor);
    setShowFeedbackForm(true);
  };

  // Function to handle closing the feedback form popup
  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    setSelectedDoctor(null);
  };

  // Function to handle feedback submission
  const handleFeedbackSubmit = (feedback, rating) => {
    const updatedReviews = reviews.map(review => {
      if (review.id === selectedDoctor.id) {
        return { ...review, feedback, rating, reviewGiven: true };
      }
      return review;
    });
    setReviews(updatedReviews);
    closeFeedbackForm(); // Close the feedback form after submission
  };

  return (
    <div className="review-form">
      <h3>Please share feedback about your doctors</h3>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Forms</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.doctorName}</td>
              <td>{review.doctorSpeciality}</td>
              <td>
                {/* Replace input field with a button */}
                {!review.reviewGiven ? (
                  <button
                    onClick={() => openFeedbackForm(review.id)}
                    className="feedback-button"
                  >
                    Provide Feedback
                  </button>
                ) : (
                  <span className="feedback-submitted">Feedback Submitted</span>
                )}
              </td>
              <td>
                {review.reviewGiven && (
                  <div>
                    <p>Rating: {review.rating}</p>
                    <p>Review: {review.feedback}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditional rendering of FeedbackForm popup */}
      {showFeedbackForm && selectedDoctor && (
        <div className="feedback-form-popup">
          <FeedbackForm
            doctor={selectedDoctor}
            onClose={closeFeedbackForm}
            onSubmit={handleFeedbackSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewForm;