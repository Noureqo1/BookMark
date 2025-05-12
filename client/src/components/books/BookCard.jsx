import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Clock, Headphones, Download } from 'lucide-react';
import useOfflineStorage from '../../hooks/useOfflineStorage';
import StarRating from '../reviews/StarRating';

const BookCard = ({ book }) => {
  const { downloadBook, isBookDownloaded, isDownloading } = useOfflineStorage();
  const downloaded = isBookDownloaded(book._id);
  const downloading = isDownloading(book._id);

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      if (!book.audioFile) {
        throw new Error('No audio file available');
      }
      await downloadBook(book._id, book.audioFile);
    } catch (error) {
      console.error('Failed to download:', error);
      alert(error.message || 'Failed to download book');
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.coverImage || 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg'}
          alt={book.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Link 
              to={`/player/${book._id}`}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-2 rounded-lg flex items-center justify-center transition-colors duration-200"
            >
              <Headphones className="h-4 w-4 mr-2" />
              Listen Now
            </Link>
            <button
              onClick={handleDownload}
              disabled={downloading || downloaded}
              className={`w-full font-medium py-2 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                downloading ? 'bg-gray-400 cursor-wait' :
                downloaded ? 'bg-green-500 text-white cursor-not-allowed' : 
                'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {downloading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  <span>{downloaded ? 'Downloaded' : 'Download'}</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Genre Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
            {book.genre}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-md">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="ml-1 text-xs font-semibold text-amber-700">{book.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <StarRating rating={book.averageRating || 0} readOnly size="sm" />
              <span className="text-yellow-600">({book.reviewCount || 0})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{Math.round(book.duration / 60)} min</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
          {book.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        <p className="text-gray-500 text-sm line-clamp-2 mt-auto">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard;