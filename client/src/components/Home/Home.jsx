import React from 'react';
import { BookOpen, Headphones, BookMarked, Sparkles, Star, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white w-full flex-grow">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Discover the World Through <span className="text-amber-400">Audiobooks</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
              Your journey into a universe of knowledge and entertainment begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 duration-300 flex items-center justify-center">
                <Headphones className="mr-2 h-5 w-5" />
                Start Listening
              </button>
              <button className="bg-transparent hover:bg-white/10 border-2 border-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                Explore Collection
              </button>
            </div>
          </div>
            <div className="md:w-1/2 relative">
            <div className="relative mx-auto max-w-md">
              <img 
                src="assets/logo.png" 
                alt="Person enjoying audiobook" 
                className="rounded-lg shadow-2xl relative z-10 w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-amber-500 rounded-lg p-6 shadow-xl z-20">
                <div className="flex items-center text-gray-900">
                  <Headphones className="h-8 w-8 mr-2" />
                  <div>
                    <p className="font-bold">50,000+</p>
                    <p className="text-sm">Audiobooks</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-xl z-20 animate-pulse">
                <div className="flex items-center text-gray-900">
                  <BookMarked className="h-6 w-6 mr-2 text-blue-600" />
                  <p className="font-semibold text-sm">New Releases Weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BookMark</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the perfect blend of technology and storytelling with our cutting-edge audiobook platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Headphones className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Audio Quality</h3>
              <p className="text-gray-600">Immerse yourself in crystal clear sound with our high-definition audio technology.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Extensive Library</h3>
              <p className="text-gray-600">Access thousands of titles across every genre, from bestsellers to exclusive originals.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Experience</h3>
              <p className="text-gray-600">Discover new favorites with our smart recommendation engine tailored to your preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white w-full">
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Listening Journey Today</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Unlock unlimited access to premium audiobooks and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 duration-300 text-lg">
                Get Started For Free
              </button>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Home;