/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Search, Users, Phone } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Public links visible to everyone
  const publicLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/rentals', label: 'Browse Rentals', icon: Search },
    { path: '/renters', label: 'Renters', icon: Users },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  // Private links visible only when logged in (simplified)
  const privateLinks = [
    { path: '/profile', label: 'My Profile', icon: User },
  ];

  // Combine links based on auth status
  const navLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 border-b-2 border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
              R
            </div>
            <span className="text-2xl font-bold text-pink-700 tracking-wide">RentKaro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(path)
                    ? 'text-white bg-pink-500 shadow-md'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <>
                {/* <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300"
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link> */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 text-pink-600 border-2 border-pink-500 rounded-xl hover:bg-pink-50 transition-all duration-300 shadow-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-pink-100 transition-colors duration-300 shadow-sm"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 space-y-3 bg-white border-t border-pink-200 rounded-b-lg shadow-inner">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(path)
                    ? 'text-white bg-pink-500 shadow-md'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-3 px-4">
                <Link
                  to="/login"
                  className="block px-6 py-3 text-center text-pink-600 border-2 border-pink-500 rounded-xl hover:bg-pink-50 transition-all duration-300 shadow-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-6 py-3 text-center bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
