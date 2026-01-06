import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { enquiriesAPI, countriesAPI, settingsAPI } from '../../services/api';
import './Contact.css';

const Contact = () => {
  const [countries, setCountries] = useState([]);
  const [settings, setSettings] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country_id: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const whatsappNumber = (settings.whatsapp_number || '').replace(/\D/g, '');

  useEffect(() => {
    countriesAPI.getAll({ status: 'active' })
      .then(response => setCountries(response.data))
      .catch(error => console.error('Failed to fetch countries:', error));

    settingsAPI.getAll()
      .then(response => setSettings(response.data))
      .catch(error => console.error('Failed to fetch settings:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await enquiriesAPI.create(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', country_id: '', message: '' });
    } catch (err) {
      setError('Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our expert counselors</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Get In Touch</h2>
              <p>Have questions? We're here to help you every step of the way.</p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <h4>Address</h4>
                    <p>{settings.contact_address || '123 Business Avenue, Suite 100, New York, NY 10001'}</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <FaPhone className="contact-icon" />
                  <div>
                    <h4>Phone</h4>
                    <p>{settings.contact_phone || '+1 (555) 123-4567'}</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h4>Email</h4>
                    <p>{settings.contact_email || 'info@consultancy.com'}</p>
                  </div>
                </div>
                {whatsappNumber && (
                  <div className="contact-info-item">
                    <FaWhatsapp className="contact-icon" />
                    <div>
                      <h4>WhatsApp</h4>
                      <a href={`https://wa.me/${whatsappNumber}`} className="whatsapp-link">
                        Chat with us
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="office-hours">
                <h4>Office Hours</h4>
                <p>{settings.office_hours || 'Mon-Fri: 9:00 AM - 6:00 PM'}</p>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              {success && (
                <div className="alert alert-success">
                  Thank you! Your enquiry has been submitted successfully. We'll get back to you soon.
                </div>
              )}
              {error && (
                <div className="alert alert-error">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Interested Country</label>
                  <select
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleChange}
                  >
                    <option value="">Select a country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
