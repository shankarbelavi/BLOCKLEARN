import React, { useState } from 'react';

const FeedbackSystem = ({
  onFeedbackSubmit,
  disabled = false,
  size = 'medium',
  showLabels = true
}) => {
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const feedbackOptions = [
    { id: 'angry', label: 'Angry', value: 1 },
    { id: 'sad', label: 'Sad', value: 2 },
    { id: 'ok', label: 'Okay', value: 3 },
    { id: 'good', label: 'Good', value: 4 },
    { id: 'happy', label: 'Happy', value: 5 }
  ];

  const handleFeedbackSelect = (feedbackId, value) => {
    if (disabled || submitted) return;

    setSelectedFeedback(feedbackId);
    if (onFeedbackSubmit) {
      onFeedbackSubmit(value, feedbackId);
      setSubmitted(true);
    }
  };

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  const getFaceContent = (feedbackId) => {
    switch (feedbackId) {
      case 'angry':
        return (
          <div className="relative">
            <svg className="eye w-1.5 h-1" viewBox="0 0 7 4">
              <path d="M1,1 L6,1 M1,3 L6,3" />
            </svg>
            <svg className="eye right w-1.5 h-1" viewBox="0 0 7 4">
              <path d="M1,1 L6,1 M1,3 L6,3" />
            </svg>
            <svg className="mouth w-4.5 h-1.5" viewBox="0 0 18 7">
              <path d="M2,2 Q9,6 16,2" />
            </svg>
          </div>
        );
      case 'sad':
        return (
          <div className="relative">
            <div className="w-1 h-1 bg-current rounded-full opacity-70"></div>
            <div className="w-1 h-1 bg-current rounded-full opacity-70 ml-3"></div>
            <svg className="mouth w-4.5 h-1.5" viewBox="0 0 18 7">
              <path d="M2,5 Q9,1 16,5" />
            </svg>
          </div>
        );
      case 'ok':
        return (
          <div className="relative">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full ml-3"></div>
            <svg className="mouth w-4.5 h-0.5" viewBox="0 0 18 2">
              <path d="M2,1 L16,1" />
            </svg>
          </div>
        );
      case 'good':
        return (
          <div className="relative">
            <svg className="eye w-1.5 h-1" viewBox="0 0 7 4">
              <path d="M1,2 L6,2" />
            </svg>
            <svg className="eye right w-1.5 h-1" viewBox="0 0 7 4">
              <path d="M1,2 L6,2" />
            </svg>
            <div className="w-1 h-1 bg-current rounded-full opacity-50 blur-sm"></div>
            <div className="w-1 h-1 bg-current rounded-full opacity-50 blur-sm ml-4"></div>
          </div>
        );
      case 'happy':
        return (
          <div className="relative">
            <svg className="eye w-1.5 h-0.5" viewBox="0 0 7 2">
              <path d="M1,1 L6,1" />
            </svg>
            <svg className="eye right w-1.5 h-0.5" viewBox="0 0 7 2">
              <path d="M1,1 L6,1" />
            </svg>
            <svg className="mouth w-4.5 h-2" viewBox="0 0 18 8">
              <path d="M2,3 Q9,7 16,3" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="text-2xl mb-2">✅</div>
        <p className="text-green-800 dark:text-green-300 text-sm font-medium">
          Thank you for your feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showLabels && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
            How was your experience?
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Rate your session experience
          </p>
        </div>
      )}

      <ul className="feedback flex justify-center items-center">
        {feedbackOptions.map((option) => (
          <li key={option.id}>
            <label className={option.id}>
              <input
                type="radio"
                name="feedback"
                value={option.value}
                checked={selectedFeedback === option.id}
                onChange={() => handleFeedbackSelect(option.id, option.value)}
                disabled={disabled}
              />
              <div className={`${sizeClasses[size]} flex items-center justify-center`}>
                {getFaceContent(option.id)}
              </div>
            </label>
          </li>
        ))}
      </ul>

      {showLabels && (
        <div className="flex justify-center text-xs text-gray-500 dark:text-slate-400 space-x-4">
          <span>😠 Poor</span>
          <span>😐 Fair</span>
          <span>😊 Good</span>
        </div>
      )}
    </div>
  );
};

export default FeedbackSystem;
