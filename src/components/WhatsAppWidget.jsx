import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { settingsAPI } from '../services/api';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    settingsAPI.getAll()
      .then(response => setSettings(response.data))
      .catch(error => console.error('Failed to fetch settings:', error));
  }, []);

  const whatsappNumber = (settings.whatsapp_number || '').replace(/\D/g, '');
  const whatsappMessage = encodeURIComponent('Hello, I am interested in your services. Can you help me?');
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}` : '#';

  if (!whatsappNumber) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-bounce-short">
          <div className="bg-pascal-blue p-6 text-white flex justify-between items-center">
            <div>
              <h4 className="font-bold">Chat with us</h4>
              <p className="text-xs opacity-80">Online | Usually replies in minutes</p>
            </div>
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-6 bg-gray-50 p-4 rounded-2xl italic">
              "Hello! How can we help you today with your study abroad plans?"
            </p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors shadow-md"
            >
              <FaWhatsapp className="text-xl" /> Start Chat
            </a>
          </div>
        </div>
      )}
      <button
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white shadow-2xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-pascal-blue rotate-90' : 'bg-[#25D366] animate-pulse'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? <FaTimes /> : <FaWhatsapp />}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
