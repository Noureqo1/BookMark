import { useState, useCallback } from 'react';

const useReviews = (bookId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/books/${bookId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  const addReview = useCallback(async (rating, comment) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/books/${bookId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (!response.ok) throw new Error('Failed to add review');
      
      const newReview = await response.json();
      setReviews(prev => [newReview, ...prev]);
      
      return true;
    } catch (err) {
      console.error('Error adding review:', err);
      setError(err.message);
      return false;
    }
  }, [bookId]);

  const deleteReview = useCallback(async (reviewId) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete review');
      
      setReviews(prev => prev.filter(review => review._id !== reviewId));
      return true;
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err.message);
      return false;
    }
  }, []);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
    deleteReview
  };
};

export default useReviews;
