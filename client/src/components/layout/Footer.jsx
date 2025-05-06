import React from 'react';
import { Facebook, Twitter, Instagram, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <h3 className="text-xl font-bold">BookMark</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your favorite platform for audiobooks and learning resources.
              Discover new worlds through the power of storytelling.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">→</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">→</span> Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-6 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-base font-semibold mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-700 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white w-full"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            {new Date().getFullYear()} BookMark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;