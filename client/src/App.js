import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BookList from './components/books/BookList';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Player from './pages/Player';
import Home from './components/home/Home';
import { Headphones, BookMarked } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div>
            <div className="bg-gradient-to-br from-blue-900 to-indigo-800 pt-24 pb-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <Routes>
                    <Route path="/" element={
                      <>
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
                      </>
                    } />
                    <Route path="/books" element={
                      <>
                        <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-1 rounded-full mb-2">
                          Your Collection
                        </span>
                        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                          Audiobook Library
                        </h1>
                        <p className="text-gray-200 max-w-2xl">
                          Explore our curated collection of premium audiobooks. 
                          Find your next literary adventure across various genres.
                        </p>
                      </>
                    } />
                    <Route path="/admin" element={
                      <>
                        <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-1 rounded-full mb-2">
                          Admin Panel
                        </span>
                        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                          Admin Dashboard
                        </h1>
                        <p className="text-gray-200">
                          Manage your audiobook collection
                        </p>
                      </>
                    } />
                  </Routes>
                </div>
              </div>
            </div>
            <main className="flex-grow bg-gray-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<BookList />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/player/:bookId"
                    element={
                      <ProtectedRoute>
                        <Player />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
