import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Book, LogOut, User, Home, Settings } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Book className="h-6 w-6" />
              <span className="tracking-wide">BookMark</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive('/') 
                    ? 'bg-amber-400/20 text-amber-400' 
                    : 'text-gray-100 hover:bg-gray-700/50 hover:text-amber-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </span>
              </Link>

              <Link
                to="/books"
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive('/books')
                    ? 'bg-amber-400/20 text-amber-400'
                    : 'text-gray-100 hover:bg-gray-700/50 hover:text-amber-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Books
                </span>
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    isActive('/admin')
                      ? 'bg-amber-400/20 text-amber-400'
                      : 'text-gray-100 hover:bg-gray-700/50 hover:text-amber-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Admin
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-400/10 rounded-lg border border-amber-400/20">
                  <User className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-300 font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all duration-200 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-100 hover:text-amber-300 font-medium rounded-lg transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-amber-500 text-gray-900 font-medium rounded-lg hover:bg-amber-400 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;