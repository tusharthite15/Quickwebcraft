import React, { useState } from 'react';
// Adjust the import path accordingly
import Feedback from './Feedback';
import { MdFeedback } from "react-icons/md";




const FeedbackTrigger = ({ toast }) => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleClick = () => {
    setIsFeedbackModalOpen(true); // Show the modal after clicking the button
  };

  return (
    <div className="FeedbackFloat">
      <div className="feedback-trigger-wrapper">
        <button onClick={handleClick}>
          <MdFeedback />
        </button>
      </div>

      {/* Feedback Modal */}
      <Feedback isOpen={isFeedbackModalOpen} toast={toast} onClose={() => setIsFeedbackModalOpen(false)} />
    </div>
  );
};

export default FeedbackTrigger;
