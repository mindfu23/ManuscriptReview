import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-primary-50 to-primary-100 shadow-sm border-b border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/koala-mascot.png"
                alt="Manuscript Koala"
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-xl text-primary-800">
                  Manuscript Koala
                </span>
                <span className="text-xs text-primary-600 hidden sm:block">
                  AI feedback for writers
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-primary-200 text-primary-800'
                  : 'text-primary-700 hover:text-primary-900 hover:bg-primary-200/50'
              }`}
            >
              Review
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-600 hover:text-primary-800 hover:bg-primary-200/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-primary-200">
          <div className="pt-2 pb-3 space-y-1 bg-primary-50">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-base font-medium ${
                isActive('/')
                  ? 'bg-primary-100 text-primary-800 border-l-4 border-primary-500'
                  : 'text-primary-700 hover:bg-primary-100 hover:text-primary-900'
              }`}
            >
              Review
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
