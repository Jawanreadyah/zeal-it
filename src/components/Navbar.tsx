import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Qatar'
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Location and Time */}
          <div className="hidden md:block">
            <span className="text-sm text-white/40">DOHA, QATAR {formatTime(time)}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/about"
              className="text-sm tracking-wider hover-line text-white/80 hover:text-white transition-colors"
            >
              ABOUT
            </Link>
            <a
              href="#services"
              className="text-sm tracking-wider hover-line text-white/80 hover:text-white transition-colors"
            >
              SERVICES
            </a>
            <a
              href="#footer"
              className="text-sm tracking-wider hover-line text-white/80 hover:text-white transition-colors"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 right-0 bg-black/95 border-b border-white/10 md:hidden">
            <div className="px-6 py-8 space-y-6">
              <Link
                to="/about"
                className="block text-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ABOUT
              </Link>
              <a
                href="#services"
                className="block text-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                SERVICES
              </a>
              <a
                href="#footer"
                className="block text-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                CONTACT
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;