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
import AppointmentModal from "../../components/common/AppointmentModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [settings, setSettings] = useState({});
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

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
      {/* Hero Section - Aceternity UI Inspired */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-700/10 via-transparent to-transparent"></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float-delayed"></div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-medium text-blue-200">Empowering learners worldwide</span>
            </div>

            {/* Two-Line Bold Headline with Gradient */}
            <h1 className="mb-6 animate-fade-in-up animation-delay-100">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-2">
                Transform Your
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent leading-[1.1]">
                Learning Journey
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light animate-fade-in-up animation-delay-200">
              Discover world-class education programs and expert-led classes designed to help you achieve your academic and professional goals.
            </p>

            {/* CTA Buttons with Glow Effect */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up animation-delay-300">
              <Link
                to="/programs"
                className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></span>
                <span className="relative flex items-center gap-2">
                  Get Started Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full border-2 border-slate-600 hover:border-blue-400 backdrop-blur-sm hover:bg-white/5 hover:shadow-[0_0_30px_rgba(148,163,184,0.3)] hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="relative flex items-center gap-2">
                  Book Appointment
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-slate-700/50 animate-fade-in-up animation-delay-400">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">10+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">5000+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Expert Instructors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-slate-600 rounded-full p-1">
            <div className="w-1 h-2 bg-slate-500 rounded-full mx-auto animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
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
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                  alt="Students"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-pascal-orange p-6 rounded-3xl shadow-xl text-white hidden md:block">
                <span className="text-4xl font-extrabold block mb-1">10+</span>
                <span className="text-sm font-medium opacity-90 uppercase tracking-wider">Years of Excellence</span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-3">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Future Through Education
              </h3>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">
                We are dedicated to providing high-quality education and training programs that empower individuals to achieve their career aspirations and personal growth.
              </p>
              <ul className="space-y-3 mb-8">
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
              <Link to="/about" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2 transition">
                Learn More About Us <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-3">Popular Classes</h2>
              <p className="text-blue-100 text-base max-w-xl">
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
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-pascal-orange rounded-[2rem] p-6 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Your Skills</h2>
                <p className="text-orange-50 text-base mb-8 leading-relaxed">
                  Join our IELTS, PTE, or Language classes led by expert instructors. We offer flexible schedules to fit your needs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2">IELTS Morning</h4>
                    <p className="opacity-80">11:00 AM - 1:00 PM</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-2">Japanese Evening</h4>
                    <p className="opacity-80">4:00 PM - 6:00 PM</p>
                  </div>
                </div>
                <Link to="/classes" className="bg-white text-pascal-orange px-8 py-3 rounded-xl font-bold hover:bg-pascal-blue hover:text-white transition-all inline-block">
                  View Full Class Schedule
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white p-6 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-5">Quick Enquiry</h3>
                  <form className="space-y-3">
                    <input type="text" placeholder="Your Name" className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-pascal-orange text-gray-900" />
                    <input type="email" placeholder="Email Address" className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-pascal-orange text-gray-900" />
                    <select className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-pascal-orange text-gray-900">
                      <option>Interested Course</option>
                      <option>IELTS</option>
                      <option>PTE</option>
                      <option>Japanese</option>
                    </select>
                    <button className="w-full btn-pascal-orange py-3">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Future?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="btn-pascal-blue px-8 py-3 text-base"
            >
              Book a Free Consultation
            </button>
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors text-base"
              >
                <FaWhatsapp className="text-xl" /> WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </section>
      <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} />
    </div>
  );
};

export default Home;
