import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 'medium' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const handleClick = (starRating) => {
    if (!readonly) {
      onRatingChange(starRating);
    }
  };

  const handleMouseEnter = (starRating) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const starId = `star${star}`;
        const isActive = star <= (hoverRating || rating);

        return (
          <React.Fragment key={star}>
            <input
              type="radio"
              id={starId}
              name="rating"
              value={star}
              checked={rating === star}
              onChange={() => {}} // Controlled by parent
              className="rating-input"
            />
            <label
              htmlFor={starId}
              className={`rating-label ${sizeClasses[size]} ${!readonly ? 'cursor-pointer' : ''}`}
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
            >
              <svg
                className={`star-svg ${isActive ? 'active' : ''}`}
                viewBox="0 0 24 24"
                fill={isActive ? (rating >= star ? '#19c37d' : '#666') : '#666'}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StarRating;
