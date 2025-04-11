import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import api from '../../utils/api'; 

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setBooks(response.data.books);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message || 'Failed to fetch books');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <div>No books found</div>
        )}
      </div>
    </div>
  );
};

export default BookList;