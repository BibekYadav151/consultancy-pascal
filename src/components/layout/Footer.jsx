import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { settingsAPI } from '../../services/api';
import './Footer.css';

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    settingsAPI.getAll()
      .then(response => setSettings(response.data))
      .catch(error => console.error('Failed to fetch settings:', error));
  }, []);

  const whatsappNumber = (settings.whatsapp_number || '').replace(/\D/g, '');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{settings.site_name || 'Big Partner Consultancy'}</h3>
            <p>Your trusted partner for international education opportunities.</p>
            <div className="social-links">
              {settings.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>}
              {settings.twitter_url && <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
              {settings.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
              {settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/universities">Universities</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li>Visa Guidance</li>
              <li>University Admissions</li>
              <li>Career Counseling</li>
              <li>Scholarship Assistance</li>
              <li>Test Preparation</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>{settings.contact_address}</p>
            <p>Email: {settings.contact_email}</p>
            <p>Phone: {settings.contact_phone}</p>
            {whatsappNumber && (
              <a href={`https://wa.me/${whatsappNumber}`} className="whatsapp-link">
                <FaWhatsapp /> WhatsApp Us
              </a>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {settings.site_name || 'Big Partner Consultancy'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
