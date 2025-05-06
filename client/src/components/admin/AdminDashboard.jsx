import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, AlertCircle, Loader2 } from 'lucide-react';
import BookForm from './BookForm';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/books');
      setBooks(response.data.books);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete book. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setSelectedBook(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Book
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {selectedBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <BookForm
              book={selectedBook}
              onSave={() => {
                setShowForm(false);
                fetchBooks();
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={book.coverImage || 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg'}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setShowForm(true);
                  }}
                  className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full">
                  {book.genre}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
              <p className="text-gray-500 text-sm line-clamp-2">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Books Found</h3>
          <p className="text-gray-600">Start by adding your first book to the collection.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;