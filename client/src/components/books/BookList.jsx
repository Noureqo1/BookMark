import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import BookCard from './BookCard';
import api from '../../utils/api';
import EmptyState from '../ui/EmptyState';
import LoadingState from '../ui/LoadingState';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // Attempt to fetch from real API
      const response = await api.get('/books');
      setBooks(response.data.books);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setLoading(false);
    }
  };

  const genres = ['all', 'Fiction', 'Non-Fiction', 'Thriller', 'Fantasy', 'Self-Help', 'Biography', 'Finance', 'Sci-Fi', 'Historical Fiction'];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'duration', label: 'Duration: Longest First' },
    { value: 'duration-asc', label: 'Duration: Shortest First' }
  ];

  // Filter and sort books
  const filteredBooks = books
    .filter(book => selectedGenre === 'all' || book.genre === selectedGenre)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        // Assuming newest is based on _id for now
        return b._id.localeCompare(a._id);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'duration') {
        // Simple string comparison for now
        return b.duration.localeCompare(a.duration);
      } else if (sortBy === 'duration-asc') {
        return a.duration.localeCompare(b.duration);
      }
      return 0;
    });

  if (error && books.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Books</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
          <h2 className="font-medium text-gray-700">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} available
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-10 w-full sm:w-auto focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-700 hover:bg-gray-100 transition-colors"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                aria-label="Filter by genre"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-10 w-full sm:w-auto focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-700 hover:bg-gray-100 transition-colors"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort books"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      {loading ? (
        <LoadingState />
      ) : (
        <>
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState selectedGenre={selectedGenre} />
          )}
        </>
      )}
    </div>
  );
};

export default BookList;