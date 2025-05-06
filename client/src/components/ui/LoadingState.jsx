import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading books...</p>
      </div>
    </div>
  );
};

export default LoadingState;
