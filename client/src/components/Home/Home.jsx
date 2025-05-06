import React from 'react';
import { BookOpen, Headphones,Sparkles} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
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