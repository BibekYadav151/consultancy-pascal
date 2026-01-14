import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppointmentModal from "../../components/common/AppointmentModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, [filter]);

  const fetchPrograms = async () => {
    try {
      const params = filter !== "all" ? { category: filter } : {};
      const response = await axios.get(`${API_URL}/programs`, { params });
      if (response.data.success) {
        setPrograms(response.data.data.filter(prog => prog.status === "active"));
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "Undergraduate", "Graduate", "Certificate", "Diploma"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Programs</h1>
          <p className="text-base md:text-lg text-purple-100 max-w-2xl">
            Explore our comprehensive educational programs designed to help you achieve your goals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                filter === category
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category === "all" ? "All Programs" : category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No programs available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          )}
          </div>
          </div>
          <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} />
          );
          }

          function ProgramCard({ program }) {
          return (
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      {program.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`http://localhost:3000${program.image}`}
            alt={program.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {program.category && (
            <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {program.category}
            </span>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
        {program.short_description && (
          <p className="text-gray-600 mb-4">{program.short_description}</p>
        )}
        <div className="space-y-2 mb-4">
          {program.duration && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration: {program.duration}
            </div>
          )}
          {program.eligibility && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {program.eligibility}
            </div>
          )}
        </div>
        <Link
          to={`/programs/${program.slug}`}
          className="block w-full text-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export function ProgramDetail() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgram();
  }, [slug]);

  const fetchProgram = async () => {
    try {
      const response = await axios.get(`${API_URL}/programs/${slug}`);
      if (response.data.success) {
        setProgram(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching program:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Program not found</h2>
        <Link to="/programs" className="text-purple-600 hover:underline">
          Back to Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {program.image && (
        <div className="relative h-96 bg-gradient-to-r from-purple-600 to-pink-600">
          <img
            src={`http://localhost:3000${program.image}`}
            alt={program.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              {program.title}
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            {program.category && (
              <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium mb-6">
                {program.category}
              </span>
            )}

            {program.description && (
              <div className="prose max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: program.description }} />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {program.duration && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration
                  </h3>
                  <p className="text-gray-600">{program.duration}</p>
                </div>
              )}
              {program.eligibility && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Eligibility
                  </h3>
                  <p className="text-gray-600">{program.eligibility}</p>
                </div>
              )}
              {program.fee_structure && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fee Structure
                  </h3>
                  <p className="text-gray-600">{program.fee_structure}</p>
                </div>
              )}
              {program.features && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Features
                  </h3>
                  <p className="text-gray-600">{program.features}</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t">
              <Link
                to="/contact"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition inline-block"
              >
                Apply Now
              </Link>
            </div>
          </div>

          <Link
            to="/programs"
            className="inline-flex items-center text-purple-600 hover:underline"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
