import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUniversity, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { BACKEND_URL, countriesAPI, universitiesAPI } from '../../services/api';

const Universities = () => {
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const [cRes, uRes] = await Promise.all([
          countriesAPI.getAll({ status: 'active' }),
          universitiesAPI.getAll({ status: 'active' })
        ]);
        setCountries(cRes.data || []);
        setUniversities(uRes.data || []);
      } catch (e) {
        console.error('Failed to fetch data:', e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const filtered = useMemo(() => {
    let list = universities;
    if (selectedCountry) {
      list = list.filter((u) => u.country_name === selectedCountry);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) => 
          u.name?.toLowerCase().includes(q) || 
          u.location?.toLowerCase().includes(q) || 
          u.country_name?.toLowerCase().includes(q) ||
          u.programs_offered?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [universities, selectedCountry, search]);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-pascal-blue py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Programs & Universities</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find the perfect course in your dream destination. We partner with top-tier institutions worldwide.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-20 z-30 py-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by course, university, or location..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pascal-blue focus:border-transparent outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="md:w-64 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pascal-blue outline-none bg-white"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pascal-blue"></div>
            </div>
          ) : (
            <>
              <div className="mb-8 text-gray-600">
                Showing <span className="font-bold text-gray-900">{filtered.length}</span> programs/universities
              </div>

              <div className="grid grid-cols-1 gap-8">
                {filtered.map((u) => (
                  <div key={u.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col lg:flex-row">
                    {/* Uni Logo/Image */}
                    <div className="lg:w-1/4 bg-gray-50 p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                      {u.logo ? (
                        <img 
                          src={`${BACKEND_URL}/uploads/universities/${u.logo}`} 
                          alt={u.name} 
                          className="max-h-32 object-contain"
                        />
                      ) : (
                        <FaUniversity className="text-6xl text-gray-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div>
                          <span className="inline-block px-3 py-1 bg-blue-50 text-pascal-blue text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                            {u.country_name}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">{u.name}</h3>
                          <p className="text-gray-500 flex items-center gap-2 mt-1">
                            <FaMapMarkerAlt className="text-pascal-orange" />
                            {u.location || u.country_name}
                          </p>
                        </div>
                        <Link to={`/universities/${u.slug}`} className="btn-pascal-outline py-2 px-6">
                          View Program Details
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                        <div className="flex items-start gap-3">
                          <FaGraduationCap className="text-gray-400 mt-1" />
                          <div>
                            <p className="font-bold text-gray-700">Courses Offered</p>
                            <div className="text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: u.programs_offered || 'Bachelors, Masters, PhD' }}></div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FaCalendarAlt className="text-gray-400 mt-1" />
                          <div>
                            <p className="font-bold text-gray-700">Available Intakes</p>
                            <p className="text-gray-600">{u.intake_details ? <span dangerouslySetInnerHTML={{ __html: u.intake_details }}></span> : 'Fall, Spring, Summer'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FaClock className="text-gray-400 mt-1" />
                          <div>
                            <p className="font-bold text-gray-700">Duration</p>
                            <p className="text-gray-600">3 - 4 Years (UG), 1 - 2 Years (PG)</p>
                          </div>
                        </div>
                      </div>

                      {u.entry_requirements && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <p className="font-bold text-gray-700 mb-2">Basic Requirements:</p>
                          <div className="text-gray-600 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: u.entry_requirements }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => { setSearch(''); setSelectedCountry(''); }}
                    className="mt-6 text-pascal-blue font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
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

  if (loading) return (
    <div className="pt-40 flex justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pascal-blue"></div>
    </div>
  );
  if (!uni) return <div className="pt-40 text-center min-h-screen">University/Program not found</div>;

  return (
    <div className="pt-20">
      <section className="bg-pascal-blue py-20 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white rounded-3xl p-4 flex items-center justify-center shadow-lg flex-shrink-0">
              {uni.logo ? (
                <img src={`${BACKEND_URL}/uploads/universities/${uni.logo}`} alt={uni.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <FaUniversity className="text-5xl text-gray-300" />
              )}
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-pascal-orange text-white text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                {uni.country_name}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold">{uni.name}</h1>
              <p className="text-xl text-blue-100 mt-2 flex items-center justify-center md:justify-start gap-2">
                <FaMapMarkerAlt className="text-pascal-orange" />
                {uni.location || uni.country_name}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaGraduationCap className="text-pascal-blue" />
                  Programs Offered
                </h2>
                <RichTextContent html={uni.programs_offered} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <FaCalendarAlt className="text-pascal-orange" />
                    Intakes
                  </h3>
                  <RichTextContent html={uni.intake_details || 'Fall, Spring, Summer'} />
                </div>
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <FaClock className="text-pascal-blue" />
                    Duration
                  </h3>
                  <p className="text-gray-600">Typically 3-4 years for Undergraduate and 1-2 years for Postgraduate programs.</p>
                </div>
              </div>

              {uni.entry_requirements && (
                <div className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry Requirements</h2>
                  <RichTextContent html={uni.entry_requirements} />
                </div>
              )}

              {uni.scholarship_info && (
                <div className="p-8 md:p-12 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                  <h2 className="text-2xl font-bold text-pascal-blue mb-6">Scholarship Opportunities</h2>
                  <RichTextContent html={uni.scholarship_info} />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    {uni.website && (
                      <a 
                        href={uni.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full py-4 text-center border-2 border-pascal-blue text-pascal-blue font-bold rounded-xl hover:bg-pascal-blue hover:text-white transition-all"
                      >
                        Visit Official Website
                      </a>
                    )}
                    <Link 
                      to={`/contact?subject=Application for ${uni.name}`}
                      className="block w-full py-4 text-center bg-pascal-orange text-white font-bold rounded-xl hover:bg-pascal-blue transition-all shadow-md"
                    >
                      Apply via Pascal
                    </Link>
                  </div>
                </div>

                <div className="p-8 bg-pascal-blue rounded-3xl text-white">
                  <h4 className="font-bold text-lg mb-4">Need Help?</h4>
                  <p className="text-blue-100 text-sm mb-6">Our expert counselors can help you with the entire application process for this university.</p>
                  <Link to="/contact" className="text-pascal-orange font-bold hover:underline">Talk to a Counselor →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;
