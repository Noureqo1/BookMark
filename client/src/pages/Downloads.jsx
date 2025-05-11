import React, { useState, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import BookCard from '../components/books/BookCard';

const Downloads = () => {
  const [downloadedBooks, setDownloadedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDownloadedBooks = useCallback(async () => {
    try {
      setLoading(true);
      // Get downloaded book IDs from localStorage
      const stored = localStorage.getItem('downloadedBooks');
      const downloadedIds = stored ? JSON.parse(stored) : [];
      
      if (downloadedIds.length === 0) {
        setDownloadedBooks([]);
        return;
      }

      // Fetch book details from the API
      const response = await fetch('/api/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const allBooks = await response.json();

      // Filter only downloaded books
      const downloaded = allBooks.filter(book => downloadedIds.includes(book._id));
      setDownloadedBooks(downloaded);
    } catch (error) {
      console.error('Error fetching downloaded books:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'downloadedBooks') {
        fetchDownloadedBooks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [fetchDownloadedBooks]);

  // Initial fetch
  useEffect(() => {
    fetchDownloadedBooks();
  }, [fetchDownloadedBooks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Download className="h-6 w-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900">Downloaded Books</h1>
      </div>

      {downloadedBooks.length === 0 ? (
        <div className="text-center py-12">
          <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Downloads Yet</h2>
          <p className="text-gray-500">
            Your downloaded books will appear here for offline listening.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {downloadedBooks.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
