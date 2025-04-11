import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[60%]">
        <img
          src={book.coverImage || 'https://via.placeholder.com/300x400'}
          alt={book.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{book.title}</h3>
        <p className="text-gray-600 mb-2">By {book.author}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{book.description}</p>
        <div className="flex justify-between items-center">
          <Link
            to={`/books/${book._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details
          </Link>
          {book.audioFile && (
            <Link
              to={`/player/${book._id}`}
              className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600 transition-colors duration-300"
            >
              Listen
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
