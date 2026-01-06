import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaPassport, FaUserTie, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { BACKEND_URL, countriesAPI, universitiesAPI, blogsAPI, settingsAPI } from '../../services/api';
import './Home.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    countriesAPI.getAll({ status: 'active' })
      .then(response => setCountries(response.data.slice(0, 6)))
      .catch(error => console.error('Failed to fetch countries:', error));

    universitiesAPI.getAll({ status: 'active' })
      .then(response => setUniversities(response.data.slice(0, 8)))
      .catch(error => console.error('Failed to fetch universities:', error));

    blogsAPI.getAll({ status: 'published' })
      .then(response => setBlogs(response.data.slice(0, 3)))
      .catch(error => console.error('Failed to fetch blogs:', error));

    settingsAPI.getAll()
      .then(response => setSettings(response.data))
      .catch(error => console.error('Failed to fetch settings:', error));
  }, []);

  const whatsappNumber = (settings.whatsapp_number || '').replace(/\D/g, '');

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Gateway to
            <span className="highlight"> Global Education</span>
          </h1>
          <p className="hero-subtitle">
            Expert guidance for studying abroad. We help you achieve your dreams
            of international education with personalized counseling and support.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn btn-primary">Apply Now</Link>
            <Link to="/contact" className="btn btn-secondary">Free Consultation</Link>
          </div>
        </div>
      </section>

      <section className="featured-destinations">
        <div className="container">
          <div className="section-header">
            <h2>Top Study Destinations</h2>
            <p>Explore the most popular countries for international students</p>
          </div>
          <div className="countries-grid">
            {countries.map(country => (
              <Link to={`/destinations/${country.slug}`} key={country.id} className="country-card">
                {country.flag_image && (
                  <img src={`${BACKEND_URL}/uploads/countries/${country.flag_image}`} alt={country.name} />
                )}
                <h3>{country.name}</h3>
                <p>{country.short_description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/destinations" className="btn btn-outline">View All Destinations</Link>
          </div>
        </div>
      </section>

      <section className="popular-universities">
        <div className="container">
          <div className="section-header">
            <h2>Popular Universities</h2>
            <p>Top institutions partnered with us</p>
          </div>
          <div className="universities-slider">
            {universities.map(university => (
              <div key={university.id} className="university-card">
                {university.logo && (
                  <img src={`${BACKEND_URL}/uploads/universities/${university.logo}`} alt={university.name} />
                )}
                <h4>{university.name}</h4>
                <p>{university.location}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/universities" className="btn btn-outline">View All Universities</Link>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive support for your study abroad journey</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><FaPassport /></div>
              <h3>Visa Guidance</h3>
              <p>Complete assistance with visa applications and documentation</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><FaGraduationCap /></div>
              <h3>University Admissions</h3>
              <p>Help you get admitted to top universities worldwide</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><FaUserTie /></div>
              <h3>Career Counseling</h3>
              <p>Professional guidance for choosing the right course and career path</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>What our students say about us</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Big Partner Consultancy helped me get admission to my dream university in the UK. Their guidance was invaluable!"</p>
              <h4>Sarah Johnson</h4>
              <span>Now studying in University of Oxford</span>
            </div>
            <div className="testimonial-card">
              <p>"The visa process was so smooth thanks to their expert team. Highly recommended for anyone planning to study abroad."</p>
              <h4>Michael Chen</h4>
              <span>Now studying in University of Toronto</span>
            </div>
            <div className="testimonial-card">
              <p>"From university selection to visa approval, they supported me every step of the way. Amazing service!"</p>
              <h4>Priya Sharma</h4>
              <span>Now studying in Harvard University</span>
            </div>
          </div>
        </div>
      </section>

      <section className="latest-blogs">
        <div className="container">
          <div className="section-header">
            <h2>Latest Updates</h2>
            <p>Stay informed with our blog and news</p>
          </div>
          <div className="blogs-grid">
            {blogs.map(blog => (
              <Link to={`/blog/${blog.slug}`} key={blog.id} className="blog-card">
                {blog.featured_image && (
                  <img src={`${BACKEND_URL}/uploads/blogs/${blog.featured_image}`} alt={blog.title} />
                )}
                <div className="blog-content">
                  <span className="blog-category">{blog.category}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.short_description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/blog" className="btn btn-outline">View All Posts</Link>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Get in touch with our expert counselors today</p>
          <div className="cta-buttons">
            {whatsappNumber && (
              <a href={`https://wa.me/${whatsappNumber}`} className="btn btn-success">
                <FaWhatsapp /> WhatsApp Us
              </a>
            )}
            <a href={`tel:${settings.contact_phone}`} className="btn btn-primary">
              <FaPhone /> Call Now
            </a>
            <Link to="/contact" className="btn btn-secondary">Contact Form</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
