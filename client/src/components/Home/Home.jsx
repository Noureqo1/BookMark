import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, SpeakerWaveIcon, AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white"></div>
        <div className="relative pt-16 pb-32">
          <div className="container mx-auto px-4 text-center">
            <img
              src="/assets/Logo.png"
              alt="BookMark Alt Logo"
              className="h-24 mx-auto mb-8"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learn Anywhere,
              <span className="text-blue-600"> Anytime</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Transform your study experience with our extensive collection of educational books and audio content. 
              Perfect for learning on the go, during commutes, or while relaxing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/books" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group"
              >
                Start Learning
                <ChevronRightIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/books?type=audio" 
                className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <SpeakerWaveIcon className="mr-2" />
                Browse Audio Books
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 rounded-xl bg-gray-50">
              <SpeakerWaveIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Audio Learning</h3>
              <p className="text-gray-600">Listen to educational content while commuting or exercising</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gray-50">
              <AcademicCapIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Study Materials</h3>
              <p className="text-gray-600">Access comprehensive study materials and resources</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gray-50">
              <BookOpenIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 text-lg font-semibold mb-2">Self-Paced Learning</h3>
              <p className="text-gray-600">Learn at your own pace with flexible content delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;