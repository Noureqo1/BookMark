import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AudioBookPlayer from '../components/books/AudioPlayer';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';
import StarRating from '../components/reviews/StarRating';
import api from '../utils/api';

const Player = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);

  const fetchBook = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/books/${bookId}`);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const bookData = response.data;
      // Ensure we have all required fields
      if (!bookData || !bookData.audioFile) {
        throw new Error('Invalid book data');
      }
      console.log('Book data:', bookData);
      console.log('Audio URL:', bookData.audioFile);
      setBook(bookData);
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err.message || 'Failed to fetch book');
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  const fetchReviews = useCallback(async () => {
    try {
      setReviewsLoading(true);
      const response = await api.get(`/books/${bookId}/reviews`);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // For debugging
      console.log('Reviews from API:', response.data);
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviewsError(err.message || 'Failed to fetch reviews');
    } finally {
      setReviewsLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchBook();
        await fetchReviews();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, [fetchBook, fetchReviews, bookId]);

  const handleReviewSubmitted = useCallback(async () => {
    try {
      // First fetch the book to get updated ratings
      await fetchBook();
      // Then fetch reviews to show the new review
      await fetchReviews();
      
      // Force a re-render of the book data
      setBook(prevBook => ({ ...prevBook }));
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }, [fetchBook, fetchReviews]);

  const handleProgress = useCallback(async (currentTime) => {
    try {
      await api.post(`/books/${bookId}/progress`, {
        progress: currentTime
      });
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }, [bookId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!book) return <div className="text-center py-8">Book not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Book Info & Image */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-gray-400 text-lg">By {book.author}</p>
            </div>
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={book.coverImage || 'https://via.placeholder.com/600x800'}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Book Description</h2>
              <p className="text-gray-300">{book.description}</p>
            </div>
          </div>

          {/* Right Column - Audio Player */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <AudioBookPlayer
                bookId={bookId}
                audioUrl={book.audioFile}
                onProgress={handleProgress}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // Implement repeat functionality
                }}
              >
                Repeat Section
              </button>
              <button 
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => {
                  // Implement repeat all functionality
                }}
              >
                Repeat Book
              </button>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <StarRating 
                    rating={book.averageRating || 0} 
                    readOnly={true} 
                    size="md" 
                  />
                </div>
                <span className="text-xl font-semibold">
                  {book.averageRating ? book.averageRating.toFixed(1) : '0.0'}
                </span>
                <span className="text-gray-400 ml-1">({reviews.length} reviews)</span>
              </div>
            </div>
            
            <ReviewForm 
              bookId={bookId} 
              onReviewSubmitted={handleReviewSubmitted} 
            />
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
              <ReviewList 
                reviews={reviews} 
                isLoading={reviewsLoading} 
                error={reviewsError} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
