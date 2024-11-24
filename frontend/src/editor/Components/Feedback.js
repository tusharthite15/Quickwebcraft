import React, { useState } from 'react';
import axios from 'axios';

const Feedback = ({ isOpen, onClose, toast }) => {
  const [rating, setRating] = useState(1); // Initial rating is 1
  const [improvement, setImprovement] = useState('');
  const [bugs, setBugs] = useState('');

  const handleRating = (newRating) => {
    setRating(newRating); // Set the rating when a star is clicked
  };

  const handleSubmit = async () => {
    const feedbackData = {
      rating,
      improvement,
      bugs,
    };

    try {
      await axios.post(process.env.REACT_APP_API_URL+'/feedback', feedbackData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Reset form after submission
      setRating(1); 
      setImprovement('');
      setBugs('');
      toast.success("Thanks For Your Feedback!");
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting feedback:', error.response ? error.response.data : error.message);
      toast.error("Failed to submit Feedback");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="FeedbackPopup">
          <div className="feedback-container">
            <h2 className="feedback-title">We value your feedback!</h2>

            {/* Rating Field */}
            <div className="feedback-rating">
              <iframe
                title="lottie"
                src="https://lottie.host/embed/73ad1048-078f-49f4-b803-591579bd7f0e/RVI4XgXcRY.json"
              ></iframe>
              <label className="feedback-label">How would you rate your overall experience?</label>
              <div className="feedback-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    className="feedback-star"
                  >
                    {rating >= star ? '⭐' : '⚪'} 
                  </button>
                ))}
              </div>
            </div>

            {/* Improvement Suggestion Field */}
            <div className="feedback-input">
              <label className="feedback-label">What’s one thing we could improve?</label>
              <textarea
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
                rows="3"
                className="feedback-textarea"
                placeholder="Your suggestion"
              />
            </div>

            {/* Bug Report Field (Optional) */}
            <div className="feedback-input">
              <label className="feedback-label">Did you face any issues or bugs? (Optional)</label>
              <textarea
                value={bugs}
                onChange={(e) => setBugs(e.target.value)}
                rows="3"
                className="feedback-textarea"
                placeholder="Describe any issues you faced"
              />
            </div>

            {/* Submit and Close Buttons */}
            <div className="feedback-buttons">
              <button
                onClick={handleSubmit}
                className="feedback-submit-button"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="feedback-close-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
