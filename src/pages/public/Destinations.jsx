import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL, countriesAPI } from '../../services/api';
import RichTextContent from '../../components/common/RichTextContent';
import './Destinations.css';

const stripHtml = (html = '') => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const Destinations = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countriesAPI.getAll({ status: 'active' })
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch countries:', error);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.short_description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="destinations-page">
      <section className="page-hero">
        <div className="container">
          <h1>Study Destinations</h1>
          <p>Explore top countries for international education</p>
        </div>
      </section>

      <section className="destinations-content">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="countries-grid">
              {filteredCountries.map(country => (
                <Link to={`/destinations/${country.slug}`} key={country.id} className="country-card">
                  {country.flag_image && (
                    <img src={`${BACKEND_URL}/uploads/countries/${country.flag_image}`} alt={country.name} />
                  )}
                  <div className="card-content">
                    <h3>{country.name}</h3>
                    <p>{stripHtml(country.short_description)}</p>
                    <span className="read-more">Learn More →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredCountries.length === 0 && (
            <div className="no-results">
              <p>No countries found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const CountryDetail = () => {
  const { slug } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countriesAPI.getBySlug(slug)
      .then(response => {
        setCountry(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch country:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!country) return <div className="error">Country not found</div>;

  return (
    <div className="country-detail-page">
      <section className="country-hero" style={{
        backgroundImage: country.banner_image ? 
          `url(${BACKEND_URL}/uploads/countries/${country.banner_image})` : 
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="container">
          <h1>{country.name}</h1>
        </div>
      </section>

      <section className="country-content">
        <div className="container">
          <div className="content-section">
            <h2>About {country.name}</h2>
            <RichTextContent html={country.description} />
          </div>

          {country.education_system && (
            <div className="content-section">
              <h2>Education System</h2>
              <RichTextContent html={country.education_system} />
            </div>
          )}

          {country.cost_of_living && (
            <div className="content-section">
              <h2>Cost of Living</h2>
              <RichTextContent html={country.cost_of_living} />
            </div>
          )}

          {country.visa_info && (
            <div className="content-section">
              <h2>Visa Information</h2>
              <RichTextContent html={country.visa_info} />
            </div>
          )}

          {country.universities && country.universities.length > 0 && (
            <div className="content-section">
              <h2>Universities in {country.name}</h2>
              <div className="universities-list">
                {country.universities.map(university => (
                  <div key={university.id} className="university-item">
                    <h3>{university.name}</h3>
                    <p>{university.location}</p>
                    {university.tuition_fees && <p><strong>Tuition:</strong> {university.tuition_fees}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="cta-section">
            <h2>Interested in studying in {country.name}?</h2>
            <Link to="/contact" className="btn btn-primary">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
