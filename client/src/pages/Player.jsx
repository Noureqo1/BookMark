import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AudioBookPlayer from '../components/books/AudioPlayer';
import api from '../utils/api';

const Player = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchBook();
  }, [fetchBook, bookId]);

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
      </div>
    </div>
  );
};

export default Player;
