import React from 'react';
import { BookX } from 'lucide-react';

const EmptyState = ({ selectedGenre }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <BookX className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No books found
        </h3>
        <p className="text-gray-600">
          {selectedGenre === 'all'
            ? "We couldn't find any books in our library. Please check back later."
            : `We couldn't find any books in the "${selectedGenre}" genre. Try selecting a different genre or check back later.`}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
