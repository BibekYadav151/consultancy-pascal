import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaBook,
  FaUserTie,
  FaPhone,
  FaWhatsapp,
  FaQuoteLeft,
  FaCertificate,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaClock,
  FaChalkboardTeacher
} from "react-icons/fa";
import { settingsAPI } from "../../services/api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/classes?status=active`)
      .then((response) => response.data.success && setClasses(response.data.data.slice(0, 3)))
      .catch((error) => console.error("Failed to fetch classes:", error));

    axios.get(`${API_URL}/programs?status=active`)
      .then((response) => response.data.success && setPrograms(response.data.data.slice(0, 3)))
      .catch((error) => console.error("Failed to fetch programs:", error));

    settingsAPI.getAll()
      .then((response) => setSettings(response.data))
      .catch((error) => console.error("Failed to fetch settings:", error));
  }, []);

  const whatsappNumber = (settings.whatsapp_number || "").replace(/\D/g, "");

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050335192-ce11558cd97d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pascal-blue/90 to-pascal-blue/40"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Unlock Your <br />
              <span className="text-orange-500 text-shadow">Learning Potential</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-10 leading-relaxed font-light">
              Discover world-class education programs and expert-led classes designed to help you 
              achieve your academic and professional goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/programs" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg font-semibold transition">
                Explore Programs
              </Link>
              <Link to="/classes" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-lg font-semibold transition">
                Browse Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search/Filter Bar (Floating) */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courses, universities, or countries..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pascal-blue focus:border-transparent outline-none transition-all"
            />
          </div>
          <Link to="/universities" className="btn-pascal-blue w-full md:w-auto px-10 py-4">
            Search
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide exceptional educational experiences designed to transform your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaChalkboardTeacher />, title: "Expert Instructors", desc: "Learn from industry professionals with years of real-world experience." },
              { icon: <FaCertificate />, title: "Certified Programs", desc: "Earn recognized certifications that boost your career prospects." },
              { icon: <FaUsers />, title: "Interactive Learning", desc: "Engage in hands-on projects and collaborative learning experiences." },
              { icon: <FaAward />, title: "Proven Success", desc: "Join thousands of successful graduates who achieved their goals with us." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Students" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-pascal-orange p-8 rounded-3xl shadow-xl text-white hidden md:block">
                <span className="text-5xl font-extrabold block mb-2">10+</span>
                <span className="text-lg font-medium opacity-90 uppercase tracking-wider">Years of Excellence</span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Transform Your Future Through Education
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We are dedicated to providing high-quality education and training programs that empower individuals to achieve their career aspirations and personal growth.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Personalized learning paths for every student",
                  "Industry-recognized certifications and programs",
                  "Expert instructors with real-world experience",
                  "Flexible learning options to fit your schedule"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700 font-medium">
                    <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition">
                Learn More About Us <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Popular Classes</h2>
              <p className="text-blue-100 text-lg max-w-xl">
                Choose from our expertly designed classes and start your learning journey today.
              </p>
            </div>
            <Link to="/classes" className="text-white border-b-2 border-orange-500 pb-1 font-bold hover:text-orange-500 transition-colors hidden md:block">
              View All Classes
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <Link
                to={`/classes/${classItem.slug}`}
                key={classItem.id}
                className="group bg-white text-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {classItem.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`http://localhost:3000${classItem.image}`}
                      alt={classItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {classItem.level && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {classItem.level}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                  {classItem.short_description && (
                    <p className="text-gray-600 mb-4">{classItem.short_description}</p>
                  )}
                  {classItem.price && (
                    <div className="text-orange-500 font-bold text-lg">{classItem.price}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Classes Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-pascal-orange rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Master Your Skills</h2>
                <p className="text-orange-50 text-xl mb-10 leading-relaxed">
                  Join our IELTS, PTE, or Language classes led by expert instructors. We offer flexible schedules to fit your needs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2">IELTS Morning</h4>
                    <p className="opacity-80">11:00 AM - 1:00 PM</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2">Japanese Evening</h4>
                    <p className="opacity-80">4:00 PM - 6:00 PM</p>
                  </div>
                </div>
                <Link to="/classes" className="bg-white text-pascal-orange px-10 py-4 rounded-xl font-bold hover:bg-pascal-blue hover:text-white transition-all inline-block">
                  View Full Class Schedule
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Enquiry</h3>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-pascal-orange text-gray-900" />
                    <input type="email" placeholder="Email Address" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-pascal-orange text-gray-900" />
                    <select className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-pascal-orange text-gray-900">
                      <option>Interested Course</option>
                      <option>IELTS</option>
                      <option>PTE</option>
                      <option>Japanese</option>
                    </select>
                    <button className="w-full btn-pascal-orange py-4">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Ready to Start Your Future?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="btn-pascal-blue px-10 py-4 text-lg">
              Book a Free Consultation
            </Link>
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors text-lg"
              >
                <FaWhatsapp className="text-2xl" /> WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
