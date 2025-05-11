import React from 'react';
import StarRating from './StarRating';

const ReviewItem = ({ review }) => {
  // Format the date
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // For debugging
  console.log('Review data:', review);

  return (
    <div className="border-b border-gray-700 py-4 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-medium">
              {review.user?.name || 'Anonymous User'}
            </h4>
            <span className="text-sm text-gray-400">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={review.rating} readOnly={true} size="sm" />
          </div>
          {review.comment && (
            <p className="text-gray-300 mt-2 whitespace-pre-wrap">{review.comment}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewList = ({ reviews, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="py-4 text-center text-gray-400">
        <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-600 border-t-blue-500 rounded-full mb-2"></div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className="py-4 text-center text-gray-400">No reviews yet. Be the first to leave a review!</div>;
  }

  return (
    <div className="space-y-4 mt-4">
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
