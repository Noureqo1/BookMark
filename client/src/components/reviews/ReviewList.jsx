import React from 'react';
import StarRating from './StarRating';

const ReviewItem = ({ review }) => {
  // Format the date
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{review.userName || 'Anonymous User'}</h4>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} readOnly={true} size="sm" />
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
        </div>
      </div>
      {review.comment && <p className="text-gray-700 mt-2">{review.comment}</p>}
    </div>
  );
};

const ReviewList = ({ reviews, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="py-4 text-center text-gray-500">
        <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full mb-2"></div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className="py-4 text-center text-gray-500">No reviews yet. Be the first to leave a review!</div>;
  }

  return (
    <div className="space-y-2">
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
