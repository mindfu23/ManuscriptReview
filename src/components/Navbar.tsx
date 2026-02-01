import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Inline Koala SVG component
function KoalaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Koala face */}
      <circle cx="50" cy="55" r="35" fill="#8B9A8E"/>
      {/* Left ear */}
      <circle cx="20" cy="30" r="18" fill="#8B9A8E"/>
      <circle cx="20" cy="30" r="12" fill="#D4B896"/>
      {/* Right ear */}
      <circle cx="80" cy="30" r="18" fill="#8B9A8E"/>
      <circle cx="80" cy="30" r="12" fill="#D4B896"/>
      {/* Face inner */}
      <ellipse cx="50" cy="60" rx="25" ry="22" fill="#C4CFC6"/>
      {/* Nose */}
      <ellipse cx="50" cy="55" rx="12" ry="9" fill="#4A5548"/>
      {/* Eyes */}
      <circle cx="38" cy="45" r="6" fill="#2D3A2E"/>
      <circle cx="62" cy="45" r="6" fill="#2D3A2E"/>
      <circle cx="40" cy="43" r="2" fill="white"/>
      <circle cx="64" cy="43" r="2" fill="white"/>
      {/* Glasses */}
      <circle cx="38" cy="45" r="10" fill="none" stroke="#5a4a3a" strokeWidth="2"/>
      <circle cx="62" cy="45" r="10" fill="none" stroke="#5a4a3a" strokeWidth="2"/>
      <line x1="48" y1="45" x2="52" y2="45" stroke="#5a4a3a" strokeWidth="2"/>
      <line x1="28" y1="43" x2="22" y2="38" stroke="#5a4a3a" strokeWidth="2"/>
      <line x1="72" y1="43" x2="78" y2="38" stroke="#5a4a3a" strokeWidth="2"/>
      {/* Mouth */}
      <path d="M 44 65 Q 50 70 56 65" fill="none" stroke="#4A5548" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

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
              <KoalaLogo className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="font-semibold text-xl text-primary-800">
                  Manuscript Koala
                </span>
                <span className="text-xs text-primary-600 hidden sm:block">
                  Friendly feedback for writers
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
