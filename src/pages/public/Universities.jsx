import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL, countriesAPI, universitiesAPI } from '../../services/api';
import RichTextContent from '../../components/common/RichTextContent';
import './Universities.css';

const Universities = () => {
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState('');
  const [countryId, setCountryId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const [cRes, uRes] = await Promise.all([
          countriesAPI.getAll({ status: 'active' }),
          universitiesAPI.getAll({ status: 'active' })
        ]);
        setCountries(cRes.data);
        setUniversities(uRes.data);
      } catch (e) {
        console.error('Failed to fetch universities:', e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const filtered = useMemo(() => {
    let list = universities;
    if (countryId) list = list.filter((u) => String(u.country_id) === String(countryId));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) => u.name?.toLowerCase().includes(q) || u.location?.toLowerCase().includes(q) || u.country_name?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [universities, countryId, search]);

  return (
    <div className="universities-page">
      <section className="page-hero">
        <div className="container">
          <h1>Universities</h1>
          <p>Explore popular universities and institutions</p>
        </div>
      </section>

      <section className="universities-content">
        <div className="container">
          <div className="filters-row">
            <input
              type="text"
              placeholder="Search universities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={countryId} onChange={(e) => setCountryId(e.target.value)}>
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="universities-grid">
              {filtered.map((u) => (
                <Link to={`/universities/${u.slug}`} key={u.id} className="university-card">
                  {u.logo && <img src={`${BACKEND_URL}/uploads/universities/${u.logo}`} alt={u.name} />}
                  <div className="card-content">
                    <h3>{u.name}</h3>
                    <p>{u.location}</p>
                    <span className="meta">{u.country_name}</span>
                    <span className="read-more">View Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="no-results">
              <p>No universities found matching your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const UniversityDetail = () => {
  const { slug } = useParams();
  const [uni, setUni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    universitiesAPI.getBySlug(slug)
      .then((res) => setUni(res.data))
      .catch((e) => {
        console.error('Failed to fetch university:', e);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!uni) return <div className="error">University not found</div>;

  return (
    <div className="university-detail-page">
      <section className="page-hero">
        <div className="container">
          <h1>{uni.name}</h1>
          <p>{uni.country_name}{uni.location ? ` • ${uni.location}` : ''}</p>
        </div>
      </section>

      <section className="university-detail-content">
        <div className="container">
          <div className="detail-card">
            {uni.logo && (
              <img className="detail-logo" src={`${BACKEND_URL}/uploads/universities/${uni.logo}`} alt={uni.name} />
            )}

            {uni.website && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={uni.website} target="_blank" rel="noopener noreferrer">{uni.website}</a>
              </p>
            )}

            {uni.programs_offered && (
              <div className="detail-section">
                <h3>Programs Offered</h3>
                <RichTextContent html={uni.programs_offered} />
              </div>
            )}

            {uni.tuition_fees && (
              <div className="detail-section">
                <h3>Tuition Fees</h3>
                <RichTextContent html={uni.tuition_fees} />
              </div>
            )}

            {uni.entry_requirements && (
              <div className="detail-section">
                <h3>Entry Requirements</h3>
                <RichTextContent html={uni.entry_requirements} />
              </div>
            )}

            {uni.intake_details && (
              <div className="detail-section">
                <h3>Intake Details</h3>
                <RichTextContent html={uni.intake_details} />
              </div>
            )}

            {uni.scholarship_info && (
              <div className="detail-section">
                <h3>Scholarship Info</h3>
                <RichTextContent html={uni.scholarship_info} />
              </div>
            )}

            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/universities" className="btn btn-outline">← Back to Universities</Link>
              <Link to="/contact" className="btn btn-primary" style={{ marginLeft: '0.75rem' }}>Apply / Enquire</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;
