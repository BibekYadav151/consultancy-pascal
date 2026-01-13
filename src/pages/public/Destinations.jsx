import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL, countriesAPI } from '../../services/api';
import RichTextContent from '../../components/common/RichTextContent';
import { FaSearch, FaMapMarkerAlt, FaUniversity } from 'react-icons/fa';

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
        setCountries(response.data || []);
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
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-pascal-blue py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Study Destinations</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose from the most prestigious study destinations around the globe.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pascal-blue outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pascal-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCountries.map(country => (
                <Link to={`/destinations/${country.slug}`} key={country.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col">
                  <div className="h-64 relative overflow-hidden">
                    {country.flag_image ? (
                      <img 
                        src={`${BACKEND_URL}/uploads/countries/${country.flag_image}`} 
                        alt={country.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-100"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">{country.name}</h3>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                      {stripHtml(country.short_description)}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-pascal-blue font-bold group-hover:underline">Explore Universities</span>
                      <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredCountries.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-600">Try a different search term.</p>
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

  if (loading) return (
    <div className="pt-40 flex justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pascal-blue"></div>
    </div>
  );
  if (!country) return <div className="pt-40 text-center min-h-screen">Country not found</div>;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          {country.banner_image ? (
            <img 
              src={`${BACKEND_URL}/uploads/countries/${country.banner_image}`} 
              alt={country.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-pascal-blue"></div>
          )}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{country.name}</h1>
          <div className="w-24 h-1.5 bg-pascal-orange mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">About {country.name}</h2>
                <RichTextContent html={country.description} />
              </div>

              {country.education_system && (
                <div className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100">
                  <h2 className="text-3xl font-bold text-pascal-blue mb-6">Education System</h2>
                  <RichTextContent html={country.education_system} />
                </div>
              )}

              {country.cost_of_living && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Cost of Living</h2>
                  <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                    <RichTextContent html={country.cost_of_living} />
                  </div>
                </div>
              )}

              {country.visa_info && (
                <div className="bg-orange-50 p-10 rounded-[2.5rem] border border-orange-100">
                  <h2 className="text-3xl font-bold text-pascal-orange mb-6">Visa Information</h2>
                  <RichTextContent html={country.visa_info} />
                </div>
              )}
            </div>

            {/* Sidebar / Universities */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {country.universities && country.universities.length > 0 && (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaUniversity className="text-pascal-blue" />
                      Top Universities
                    </h3>
                    <div className="space-y-4">
                      {country.universities.map(university => (
                        <Link 
                          to={`/universities/${university.slug}`} 
                          key={university.id} 
                          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                        >
                          {university.logo ? (
                            <img 
                              src={`${BACKEND_URL}/uploads/universities/${university.logo}`} 
                              alt={university.name}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <FaUniversity className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm leading-tight">{university.name}</h4>
                            <p className="text-gray-500 text-xs mt-1">{university.location}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-pascal-orange p-10 rounded-3xl text-white shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
                  <p className="opacity-90 mb-8">Our expert counselors can help you with admission and visa for {country.name}.</p>
                  <Link to="/contact" className="block w-full py-4 bg-white text-pascal-orange font-bold rounded-xl text-center hover:bg-pascal-blue hover:text-white transition-all">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
