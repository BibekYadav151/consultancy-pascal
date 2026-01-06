import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { settingsAPI } from '../../services/api';
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

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleStartChat = () => {
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}?text=Hello, I have a query.`, '_blank');
    }
  };

  return (
    <div className="whatsapp-widget-container">
      <div className={`whatsapp-chat-box ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="agent-info">
            <div className="agent-avatar">
              <FaWhatsapp />
            </div>
            <div className="agent-details">
              <h4>{settings.site_name || 'BIG Partnership'}</h4>
              <span>Online</span>
            </div>
          </div>
          <button className="close-btn" onClick={toggleWidget}>
            <FaTimes />
          </button>
        </div>
        <div className="chat-body">
          <div className="message received">
            <p>Hello! 👋 How can I help you today?</p>
            <span className="message-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        <div className="chat-footer">
          <button className="start-chat-btn" onClick={handleStartChat}>
            <FaWhatsapp /> Start Chat
          </button>
        </div>
      </div>
      <button className={`whatsapp-toggle-btn ${isOpen ? 'active' : ''}`} onClick={toggleWidget} aria-label="WhatsApp Chat">
        <FaWhatsapp />
      </button>
    </div>
  );
};

export default WhatsAppWidget;
