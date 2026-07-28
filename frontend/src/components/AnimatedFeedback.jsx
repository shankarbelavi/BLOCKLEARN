import React, { useState } from 'react';

const AnimatedFeedback = ({ feedbackType, onFeedbackChange, readonly = false }) => {
  const [selectedType, setSelectedType] = useState(feedbackType || '');

  const feedbackOptions = [
    { type: 'angry', label: 'Angry' },
    { type: 'sad', label: 'Sad' },
    { type: 'ok', label: 'OK' },
    { type: 'good', label: 'Good' },
    { type: 'happy', label: 'Happy' }
  ];

  const handleFeedbackClick = (type) => {
    if (!readonly) {
      const newType = selectedType === type ? '' : type;
      setSelectedType(newType);
      onFeedbackChange(newType);
    }
  };

  return (
    <div className="feedback">
      {feedbackOptions.map(({ type, label }) => (
        <label
          key={type}
          className={`${type} ${!readonly ? 'cursor-pointer' : ''} ${selectedType === type ? 'selected' : ''}`}
          onClick={() => handleFeedbackClick(type)}
        >
          <input
            type="radio"
            name="feedback"
            value={type}
            checked={selectedType === type}
            onChange={() => {}}
            style={{ display: 'none' }}
          />
          <div>
            {/* Eyes */}
            <svg className="eye" viewBox="0 0 24 24">
              <ellipse cx="7" cy="7" rx="3.5" ry="2.5" />
            </svg>
            <svg className="eye right" viewBox="0 0 24 24">
              <ellipse cx="7" cy="7" rx="3.5" ry="2.5" />
            </svg>

            {/* Mouth */}
            <svg className="mouth" viewBox="0 0 24 24">
              <path d="M6 12c0 0 3 3 6 3s6-3 6-3" />
            </svg>
          </div>
        </label>
      ))}
    </div>
  );
};

export default AnimatedFeedback;
