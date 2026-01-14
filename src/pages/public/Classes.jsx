import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchClasses();
  }, [filter]);

  const fetchClasses = async () => {
    try {
      const params = filter !== "all" ? { level: filter } : {};
      const response = await axios.get(`${API_URL}/classes`, { params });
      if (response.data.success) {
        setClasses(response.data.data.filter(cls => cls.status === "active"));
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Classes</h1>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl">
            Discover our range of expertly designed classes to enhance your skills and knowledge
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Levels
          </button>
          <button
            onClick={() => setFilter("Beginner")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === "Beginner"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setFilter("Intermediate")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === "Intermediate"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setFilter("Advanced")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === "Advanced"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Advanced
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No classes available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <ClassCard key={classItem.id} classData={classItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClassCard({ classData }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      {classData.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`http://localhost:3000${classData.image}`}
            alt={classData.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {classData.level && (
            <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {classData.level}
            </span>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{classData.title}</h3>
        {classData.short_description && (
          <p className="text-gray-600 mb-4">{classData.short_description}</p>
        )}
        <div className="space-y-2 mb-4">
          {classData.instructor && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {classData.instructor}
            </div>
          )}
          {classData.duration && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {classData.duration}
            </div>
          )}
          {classData.schedule && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {classData.schedule}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          {classData.price && (
            <span className="text-2xl font-bold text-blue-600">{classData.price}</span>
          )}
          <Link
            to={`/classes/${classData.slug}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ClassDetail() {
  const { slug } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClass();
  }, [slug]);

  const fetchClass = async () => {
    try {
      const response = await axios.get(`${API_URL}/classes/${slug}`);
      if (response.data.success) {
        setClassData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching class:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Class not found</h2>
        <Link to="/classes" className="text-blue-600 hover:underline">
          Back to Classes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {classData.image && (
        <div className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-700">
          <img
            src={`http://localhost:3000${classData.image}`}
            alt={classData.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              {classData.title}
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-wrap gap-4 mb-6">
              {classData.level && (
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                  {classData.level}
                </span>
              )}
              {classData.price && (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                  {classData.price}
                </span>
              )}
            </div>

            {classData.description && (
              <div className="prose max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: classData.description }} />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {classData.instructor && (
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instructor</h3>
                    <p className="text-gray-600">{classData.instructor}</p>
                  </div>
                </div>
              )}
              {classData.duration && (
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Duration</h3>
                    <p className="text-gray-600">{classData.duration}</p>
                  </div>
                </div>
              )}
              {classData.schedule && (
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Schedule</h3>
                    <p className="text-gray-600">{classData.schedule}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t">
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Enroll Now
              </Link>
            </div>
          </div>

          <Link
            to="/classes"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Classes
          </Link>
        </div>
      </div>
    </div>
  );
}
