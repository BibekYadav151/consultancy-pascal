import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaPassport,
  FaUserTie,
  FaPhone,
  FaWhatsapp,
  FaQuoteLeft,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import {
  BACKEND_URL,
  countriesAPI,
  universitiesAPI,
  blogsAPI,
  settingsAPI,
} from "../../services/api";
import educationImage from "./images/education.jpg";
import heroImage from "./images/education.jpg"; // You can replace this with a dedicated hero image
import "./Home.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    countriesAPI
      .getAll({ status: "active" })
      .then((response) => setCountries(response.data.slice(0, 5)))
      .catch((error) => console.error("Failed to fetch countries:", error));

    universitiesAPI
      .getAll({ status: "active" })
      .then((response) => setUniversities(response.data.slice(0, 8)))
      .catch((error) => console.error("Failed to fetch universities:", error));

    blogsAPI
      .getAll({ status: "published" })
      .then((response) => setBlogs(response.data.slice(0, 3)))
      .catch((error) => console.error("Failed to fetch blogs:", error));

    settingsAPI
      .getAll()
      .then((response) => setSettings(response.data))
      .catch((error) => console.error("Failed to fetch settings:", error));
  }, []);

  const whatsappNumber = (settings.whatsapp_number || "").replace(/\D/g, "");

  return (
    <div className="home">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Global Pathway to <br />
              <span>World-Class Education</span>
            </h1>
            <p className="hero-subtitle">
              Partnering students with top international universities for a
              successful future. We provide expert guidance for your study
              abroad journey.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                Apply Now
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-destinations">
        <div className="container">
          <div className="section-title">
            <h2>Featured Destinations</h2>
            <p>Explore top countries to pursue your international education</p>
          </div>
          <div className="countries-grid">
            {countries.map((country) => (
              <Link
                to={`/destinations/${country.slug}`}
                key={country.id}
                className="country-card"
              >
                <div className="country-image">
                  {country.flag_image && (
                    <img
                      src={`${BACKEND_URL}/uploads/countries/${country.flag_image}`}
                      alt={country.name}
                    />
                  )}
                  <div className="country-overlay">
                    <h3>{country.name}</h3>
                    <span>View Universities</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="why-big">
        <div className="container">
          <div className="why-big-grid">
            <div className="why-big-image">
              <img src={educationImage} alt="Education" />
            </div>
            <div className="why-big-content">
              <div className="section-title" style={{ textAlign: "left" }}>
                <h2>Why BIG Partnership</h2>
                <p>
                  We are dedicated to guiding students toward globally
                  recognized universities with transparency and excellence.
                </p>
              </div>
              <div className="benefits-list">
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Expert Counselors</h4>
                    <p>
                      Professional guidance from experienced education
                      consultants.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Global University Network</h4>
                    <p>
                      Direct partnerships with top-tier universities worldwide.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>End-to-End Support</h4>
                    <p>
                      From university selection to visa approval and beyond.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>High Visa Success Rate</h4>
                    <p>
                      Expert assistance with documentation and interview
                      preparation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-universities">
        <div className="container">
          <div className="section-title">
            <h2>Popular Universities</h2>
            <p>Top institutions partnered with us</p>
          </div>
          <div className="universities-grid">
            {universities.map((university) => (
              <div key={university.id} className="uni-card">
                <div className="uni-logo">
                  {university.logo ? (
                    <img
                      src={`${BACKEND_URL}/uploads/universities/${university.logo}`}
                      alt={university.name}
                    />
                  ) : (
                    <FaGlobe />
                  )}
                </div>
                <h4>{university.name}</h4>
                <p>{university.location}</p>
                <Link to="/universities" className="uni-link">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Student Testimonials</h2>
            <p>What our students say about their journey with us</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p>
                "BIG Partnership helped me get admission to my dream university
                in the UK. Their guidance was invaluable throughout the
                process!"
              </p>
              <div className="testimonial-author">
                <h4>Sarah Johnson</h4>
                <span>Oxford University, UK</span>
              </div>
            </div>
            <div className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p>
                "The visa process was so smooth thanks to their expert team.
                Highly recommended for anyone planning to study abroad."
              </p>
              <div className="testimonial-author">
                <h4>Michael Chen</h4>
                <span>University of Toronto, Canada</span>
              </div>
            </div>
            <div className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p>
                "From university selection to visa approval, they supported me
                every step of the way. Truly professional service!"
              </p>
              <div className="testimonial-author">
                <h4>Priya Sharma</h4>
                <span>Monash University, Australia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Start Your Journey?</h2>
            <p>
              Book your free counseling session with our expert advisors today.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Book Consultation
              </Link>
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="btn btn-success"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
