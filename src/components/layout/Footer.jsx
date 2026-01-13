import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import { settingsAPI } from "../../services/api";

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    settingsAPI.getAll()
      .then((response) => setSettings(response.data))
      .catch((error) => console.error("Failed to fetch settings:", error));
  }, []);

  const whatsappNumber = (settings.whatsapp_number || "").replace(/\D/g, "");

  return (
    <footer className="bg-pascal-blue text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex flex-col">
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-pascal-orange">Pascal</span> Education
              </span>
              <span className="text-[12px] uppercase tracking-[0.2em] font-medium opacity-80">
                Consultancy
              </span>
            </Link>
            <p className="text-blue-100 leading-relaxed">
              Your trusted partner for international education opportunities. We guide you from application to visa success.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <FaFacebook />, url: settings.facebook_url },
                { icon: <FaTwitter />, url: settings.twitter_url },
                { icon: <FaLinkedin />, url: settings.linkedin_url },
                { icon: <FaInstagram />, url: settings.instagram_url },
              ].map((social, i) => social.url && (
                <a 
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pascal-orange transition-colors text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="text-blue-100 hover:text-pascal-orange transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-pascal-orange transition-colors">About Us</Link></li>
              <li><Link to="/universities" className="text-blue-100 hover:text-pascal-orange transition-colors">Programs</Link></li>
              <li><Link to="/destinations" className="text-blue-100 hover:text-pascal-orange transition-colors">Destinations</Link></li>
              <li><Link to="/blog" className="text-blue-100 hover:text-pascal-orange transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">Our Services</h4>
            <ul className="flex flex-col gap-4">
              <li className="text-blue-100">Visa Guidance</li>
              <li className="text-blue-100">University Admissions</li>
              <li className="text-blue-100">Language Training</li>
              <li className="text-blue-100">Career Counseling</li>
              <li className="text-blue-100">Scholarship Assistance</li>
              <li className="text-blue-100">Test Preparation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">Contact Info</h4>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-pascal-orange mt-1 text-xl flex-shrink-0" />
              <p className="text-blue-100">
                {settings.contact_address || "Putalisadak, Kathmandu, Nepal"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-pascal-orange text-xl flex-shrink-0" />
              <p className="text-blue-100">{settings.contact_email || "info@pascal.edu.np"}</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-pascal-orange text-xl flex-shrink-0" />
              <p className="text-blue-100">{settings.contact_phone || "+977-1-4412345"}</p>
            </div>
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors mt-2"
              >
                <FaWhatsapp className="text-xl" /> WhatsApp Us
              </a>
            )}
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200">
          <p>&copy; {new Date().getFullYear()} Pascal Education Consultancy. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a href="#" className="text-pascal-orange font-bold hover:underline">
              Pascal Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
