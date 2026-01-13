import React from 'react';
import { Link } from 'react-router-dom';

const Classes = () => {
  const runningClasses = [
    { id: 1, time: '11:00 AM', name: 'IELTS Preparation', category: 'Language', instructor: 'Dr. John Doe' },
    { id: 2, time: '11:00 AM', name: 'PTE Academic', category: 'Language', instructor: 'Prof. Sarah Smith' },
    { id: 3, time: '12:00 PM', name: 'Japanese Language (N5)', category: 'Language', instructor: 'Akiko Tanaka' },
    { id: 4, time: '02:00 PM', name: 'German A1', category: 'Language', instructor: 'Hans Müller' },
    { id: 5, time: '04:00 PM', name: 'Web Page Designing', category: 'Technical', instructor: 'Jane Wilson' },
  ];

  const allOfferings = [
    {
      title: 'Language Classes',
      description: 'Master a new language with our expert instructors. We offer IELTS, PTE, TOEFL, Japanese, German, French, and Korean.',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
      tags: ['IELTS', 'PTE', 'Japanese', 'German']
    },
    {
      title: 'Technical Skills',
      description: 'Boost your career with technical skills. Our web page designing course covers HTML, CSS, JavaScript, and modern frameworks.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      tags: ['Web Design', 'UI/UX', 'Digital Marketing']
    },
    {
      title: 'Entrance Preparation',
      description: 'Prepare for top universities with our specialized entrance exam coaching for various global destinations.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
      tags: ['GRE', 'GMAT', 'SAT']
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-pascal-blue py-16 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Classes</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Enhance your skills and prepare for your international journey with our professional training programs.
          </p>
        </div>
      </section>

      {/* Running Classes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Running Classes</h2>
              <p className="text-gray-600 mt-2">Join our ongoing sessions today</p>
            </div>
            <div className="hidden md:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Now
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {runningClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-pascal-orange font-bold text-lg">{cls.time}</span>
                  <span className="px-2 py-1 bg-blue-50 text-pascal-blue text-xs font-bold rounded uppercase tracking-wider">
                    {cls.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{cls.name}</h3>
                <p className="text-gray-500 text-sm mb-6">Instructor: {cls.instructor}</p>
                <Link 
                  to={`/contact?subject=Enrollment in ${cls.name} at ${cls.time}`}
                  className="w-full btn-pascal-blue py-2 text-sm"
                >
                  Apply to Join
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Offerings Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">All Programs We Offer</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From language mastery to technical excellence, explore our full range of consultancy offerings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allOfferings.map((item, idx) => (
              <div key={idx} className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to="/contact" className="text-pascal-blue font-bold hover:underline inline-flex items-center">
                    Learn More <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-pascal-orange rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Not sure which class is right for you?</h2>
              <p className="text-orange-100 text-lg">Get a free consultation with our academic advisors today.</p>
            </div>
            <Link to="/contact" className="px-8 py-4 bg-white text-pascal-orange font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              Get Free Advice
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;
