import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <h2>Big Partner</h2>
          <span>Education Consultancy</span>
        </Link>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
          <li><Link to="/destinations" className={isActive('/destinations') ? 'active' : ''}>Destinations</Link></li>
          <li><Link to="/universities" className={isActive('/universities') ? 'active' : ''}>Universities</Link></li>
          <li><Link to="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link></li>
          <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          <li><Link to="/admin" className="btn-admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
