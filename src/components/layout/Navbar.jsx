import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import AppointmentModal from '../common/AppointmentModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Programs', path: '/programs' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
        : isHomePage 
          ? 'bg-transparent py-4' 
          : 'bg-white shadow-md py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className={`text-2xl font-bold tracking-tight transition-colors ${
                isScrolled || !isHomePage ? 'text-blue-600' : 'text-white'
              }`}>
                <span className={isScrolled || !isHomePage ? 'text-orange-500' : 'text-cyan-400'}>Edu</span>Platform
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                isScrolled || !isHomePage ? 'text-gray-500' : 'text-slate-300'
              }`}>
                Learn & Grow
              </span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive(link.path) 
                      ? (isScrolled || !isHomePage ? 'text-orange-500' : 'text-cyan-400') 
                      : (isScrolled || !isHomePage ? 'text-gray-700 hover:text-orange-500' : 'text-white/90 hover:text-white')
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className={`text-sm px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-block ${
                isScrolled || !isHomePage
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-blue-600'
              }`}
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden text-2xl focus:outline-none transition-colors ${
              isScrolled || !isHomePage ? 'text-blue-600' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`block text-lg font-semibold py-2 ${
                    isActive(link.path) ? 'text-pascal-orange' : 'text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center"
              >
                Book Appointment
              </button>
            </li>
          </ul>
        </div>
      </div>
      <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
