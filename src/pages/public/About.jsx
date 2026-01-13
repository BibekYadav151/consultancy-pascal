import React from 'react';
import { FaCheckCircle, FaAward, FaGlobe, FaUsers, FaLightbulb, FaEye, FaHandshake, FaUserGraduate, FaBookOpen, FaGraduationCap, FaUniversity, FaStar, FaBullseye, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-pascal-blue text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pascal-orange/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Pascal Education</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your bridge to international excellence. We empower students to transcend boundaries and achieve global success through quality education and expert guidance.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Our Story" 
                  className="rounded-3xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-pascal-orange text-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <p className="text-2xl font-bold">Trusted by</p>
                  <p className="text-4xl font-extrabold">5000+</p>
                  <p className="text-sm uppercase tracking-wider opacity-90">Students Globally</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-pascal-blue font-bold uppercase tracking-[0.2em] text-sm mb-4">Our Journey</h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Redefining Educational Consultancy</h3>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Pascal Education Consultancy is a premier global education service provider. We are dedicated to empowering students from diverse backgrounds to achieve their academic and career goals through comprehensive pathway programs.
                </p>
                <p>
                  Our expertise lies in bridging the gap between aspiring students and world-class universities. We provide a supportive environment where students can enhance their academic, language, and cultural skills, ensuring they are fully prepared for the international stage.
                </p>
                <p>
                  With direct partnerships in the US, Canada, Australia, France, and the UK, we offer a wide range of opportunities including Bachelors, Masters, and specialized certification programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-100 text-pascal-orange rounded-3xl flex items-center justify-center text-4xl mb-8">
                <FaBullseye />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide students with innovative global education that fosters excellence in academia, accessibility, and global collaboration, paving the way for a brighter, borderless future.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 text-pascal-blue rounded-3xl flex items-center justify-center text-4xl mb-8">
                <FaEye />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the world's leading educational bridge, producing global graduates who are equipped with the skills and confidence to excel in an interconnected world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              These principles guide our every action and ensure we provide the best service to our students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaAward />, title: "Quality & Excellence", desc: "We strive for the highest standards in everything we do." },
              { icon: <FaHandshake />, title: "Integrity & Trust", desc: "Honesty and transparency are the foundations of our consultancy." },
              { icon: <FaLightbulb />, title: "Innovation", desc: "Embracing new-age methods to provide better educational pathways." },
              { icon: <FaGlobe />, title: "Global Diversity", desc: "Celebrating different cultures and promoting global mobility." },
              { icon: <FaUsers />, title: "Student Centric", desc: "Your success is our priority. We are here to support you at every step." },
              { icon: <FaChartLine />, title: "Continuous Growth", desc: "Always evolving to meet the changing needs of global education." }
            ].map((v, i) => (
              <div key={i} className="p-8 rounded-3xl border border-gray-100 hover:border-pascal-blue transition-colors group">
                <div className="text-3xl text-pascal-blue mb-6 group-hover:scale-110 transition-transform inline-block">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h4>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
              <p className="text-gray-600 text-lg">Meet the people who make your dreams come true.</p>
            </div>
            <Link to="/contact" className="btn-pascal-blue mt-6 md:mt-0">Join Our Team</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sushant Pascal", role: "CEO & Founder", img: "https://i.pravatar.cc/300?img=68" },
              { name: "Anita Sharma", role: "Senior Counselor", img: "https://i.pravatar.cc/300?img=45" },
              { name: "John Wick", role: "Visa Specialist", img: "https://i.pravatar.cc/300?img=12" },
              { name: "Sarah Connor", role: "Language Instructor", img: "https://i.pravatar.cc/300?img=32" }
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm group">
                <div className="h-64 overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900">{t.name}</h4>
                  <p className="text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-pascal-orange">
        <div className="container mx-auto px-4 md:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to take the first step?</h2>
          <p className="text-orange-50 text-xl mb-12 max-w-2xl mx-auto">
            Book a free one-on-one session with our senior counselors and start planning your international education journey today.
          </p>
          <Link to="/contact" className="px-12 py-5 bg-white text-pascal-orange font-bold rounded-2xl shadow-xl hover:bg-pascal-blue hover:text-white transition-all text-xl">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
