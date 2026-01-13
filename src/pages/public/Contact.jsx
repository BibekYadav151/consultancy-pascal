import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { enquiriesAPI, countriesAPI, settingsAPI } from "../../services/api";

const Contact = () => {
  const [countries, setCountries] = useState([]);
  const [settings, setSettings] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get('subject');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country_id: "",
    message: subject ? `I am interested in: ${subject}` : "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    countriesAPI.getAll({ status: "active" })
      .then((response) => setCountries(response.data || []))
      .catch((error) => console.error("Failed to fetch countries:", error));

    settingsAPI.getAll()
      .then((response) => setSettings(response.data))
      .catch((error) => console.error("Failed to fetch settings:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await enquiriesAPI.create(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        country_id: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-pascal-blue py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions? Our team of expert counselors is ready to guide you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Start your journey today. Fill out the form or reach out to us through any of our contact channels.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-orange-100 text-pascal-orange rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Our Office</h4>
                    <p className="text-gray-600">
                      {settings.contact_address || "Putalisadak (Opposite to Kumari Bank), Kathmandu, Nepal"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 text-pascal-blue rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone Number</h4>
                    <p className="text-gray-600">{settings.contact_phone || "+977 1 4412345 / 9801234567"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email Address</h4>
                    <p className="text-gray-600">{settings.contact_email || "info@pascal.edu.np"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Office Hours</h4>
                    <p className="text-gray-600">{settings.office_hours || "Sun-Fri: 10:00 AM - 6:00 PM"}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-md border border-gray-200 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.324209193214!2d85.32135631506198!3d27.70724898279148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19063c5a611d%3A0xc3124580b064c549!2sPutalisadak%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1625478901234!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Pascal Consultancy Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
                
                {success && (
                  <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-3">
                    <span className="text-2xl font-bold">✓</span>
                    <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                  </div>
                )}
                
                {error && (
                  <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full p-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pascal-blue focus:border-transparent transition-all outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full p-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pascal-blue focus:border-transparent transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+977 98XXXXXXXX"
                        className="w-full p-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pascal-blue focus:border-transparent transition-all outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Interested Destination</label>
                      <select
                        name="country_id"
                        value={formData.country_id}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pascal-blue focus:border-transparent transition-all outline-none"
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      placeholder="How can we help you?"
                      className="w-full p-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pascal-blue focus:border-transparent transition-all outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-pascal-orange py-5 text-lg shadow-lg"
                    disabled={submitting}
                  >
                    {submitting ? "Sending Your Message..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
