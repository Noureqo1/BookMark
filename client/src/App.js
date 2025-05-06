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
                    <Route path="/" element={<div />} />
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
