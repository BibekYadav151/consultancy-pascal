import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { settingsAPI } from '../services/api';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    settingsAPI.getAll()
      .then(response => setSettings(response.data))
      .catch(error => console.error('Failed to fetch settings:', error));
  }, []);

  const whatsappNumber = (settings.whatsapp_number || '').replace(/\D/g, '');
  const whatsappMessage = encodeURIComponent('Hello, how can I help you?');
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}` : '#';

  if (!whatsappNumber) return null;

  return (
    <div className="whatsapp-widget">
      {isOpen && (
        <div className="whatsapp-popup">
          <div className="whatsapp-popup-header">
            <h4>Chat with us</h4>
            <button 
              className="whatsapp-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>
          <div className="whatsapp-popup-content">
            <p>Hello, how can I help you?</p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-chat-btn"
            >
              Click to Chat
            </a>
          </div>
        </div>
      )}
      <button
        className="whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp chat"
      >
        <FaWhatsapp />
      </button>
    </div>
  );
};

export default WhatsAppWidget;

