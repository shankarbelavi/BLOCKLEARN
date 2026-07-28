import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import AnimatedFeedback from './AnimatedFeedback';

const FeedbackModal = ({ isOpen, onClose, onSubmit, sessionId, userRole, existingFeedback = null }) => {
  const [rating, setRating] = useState(existingFeedback?.student_rating || existingFeedback?.mentor_rating || 0);
  const [feedbackType, setFeedbackType] = useState(existingFeedback?.student_feedback_type || existingFeedback?.mentor_feedback_type || '');
  const [comment, setComment] = useState(existingFeedback?.student_comment || existingFeedback?.mentor_comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or existing feedback changes
  useEffect(() => {
    if (isOpen) {
      setRating(existingFeedback?.student_rating || existingFeedback?.mentor_rating || 0);
      setFeedbackType(existingFeedback?.student_feedback_type || existingFeedback?.mentor_feedback_type || '');
      setComment(existingFeedback?.student_comment || existingFeedback?.mentor_comment || '');
    }
  }, [isOpen, existingFeedback]);

  const handleSubmit = async () => {
    if (rating === 0 && feedbackType === '') {
      alert('Please provide at least a rating or feedback type');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        session_id: sessionId,
        rating,
        feedback_type: feedbackType,
        comment
      });
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
            Session Feedback
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Star Rating Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
            Rate the session (1-5 stars)
          </h3>
          <div className="flex justify-center">
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              size="large"
            />
          </div>
          {rating > 0 && (
            <p className="text-center text-sm text-gray-600 dark:text-slate-400 mt-2">
              {rating} star{rating !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Animated Feedback Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
            How did you feel about the session?
          </h3>
          <div className="flex justify-center">
            <AnimatedFeedback
              feedbackType={feedbackType}
              onFeedbackChange={setFeedbackType}
            />
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Additional Comments (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about the session..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
