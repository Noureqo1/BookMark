import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating, size = 'md', readOnly = false }) => {
  // Convert size to pixel value
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  const starSize = sizeMap[size] || 20;
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && setRating(star)}
          disabled={readOnly}
          className={`focus:outline-none transition-colors ${readOnly ? 'cursor-default' : 'cursor-pointer hover:text-yellow-500'}`}
          aria-label={`Rate ${star} stars out of 5`}
        >
          <Star
            className={`${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            } transition-colors`}
            size={starSize}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
