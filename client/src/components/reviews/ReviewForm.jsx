import React, { useState } from 'react';
import StarRating from './StarRating';
import api from '../../utils/api';

const ReviewForm = ({ bookId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to submit a review');
      }

      await api.post(`/books/${bookId}/reviews`, {
        rating,
        comment: comment.trim(),
      });

      // Reset form after successful submission
      setRating(0);
      setComment('');
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      
    } catch (err) {
      console.error('Review submission error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-white mb-2">Your Rating</label>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-white mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this book..."
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          rows="4"
        />
      </div>
      
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded-md text-white font-medium ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
