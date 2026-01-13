import React from "react";
import {
  FaCode,
  FaMobileAlt,
  FaEthereum,
  FaServer,
  FaShieldAlt,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

const AboutWisdom = () => {
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      description: "Cutting-edge web applications built with the latest technologies and frameworks.",
      features: ["React & Next.js", "Node.js Backend", "Cloud Deployment", "Performance Optimization"],
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions that deliver exceptional user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
    },
    {
      icon: <FaEthereum />,
      title: "Blockchain",
      description: "Decentralized applications and smart contracts for the future of digital transactions.",
      features: ["Smart Contracts", "DeFi Solutions", "NFT Platforms", "Web3 Integration"],
    },
    {
      icon: <FaServer />,
      title: "Backend Systems",
      description: "Scalable and secure backend infrastructure that powers your applications.",
      features: ["API Development", "Database Design", "Cloud Architecture", "Microservices"],
    },
    {
      icon: <FaShieldAlt />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and data.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Risk Assessment"],
    },
    {
      icon: <FaUserTie />,
      title: "Consulting",
      description: "Strategic technology consulting to guide your digital transformation journey.",
      features: ["Tech Strategy", "Architecture Review", "Team Training", "Process Optimization"],
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="bg-pascal-blue py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Wisdom Technologies</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Pioneering the future of technology with innovative solutions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Code The Future</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We build revolutionary digital experiences that push the boundaries of technology and transform how businesses operate in the digital age.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-gray-50 rounded-3xl">
                <div className="text-4xl font-bold text-pascal-blue mb-2">12+</div>
                <div className="text-gray-500 uppercase tracking-wider text-sm">Projects</div>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl">
                <div className="text-4xl font-bold text-pascal-blue mb-2">99%</div>
                <div className="text-gray-500 uppercase tracking-wider text-sm">Success Rate</div>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl">
                <div className="text-4xl font-bold text-pascal-blue mb-2">24/7</div>
                <div className="text-gray-500 uppercase tracking-wider text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services That Scale</h2>
            <p className="text-gray-600">Comprehensive technology solutions for the modern era.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-blue-50 text-pascal-blue rounded-2xl flex items-center justify-center text-3xl mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-pascal-blue text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-12">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-12">
              <div className="flex flex-col items-center">
                <FaEnvelope className="text-3xl text-pascal-orange mb-4" />
                <h4 className="font-bold mb-2">Email</h4>
                <a href="mailto:info@thewisdomtechnologies.com" className="text-blue-100 hover:text-white underline">info@thewisdomtechnologies.com</a>
              </div>
              <div className="flex flex-col items-center">
                <FaPhone className="text-3xl text-pascal-orange mb-4" />
                <h4 className="font-bold mb-2">Phone</h4>
                <a href="tel:+9779805987922" className="text-blue-100 hover:text-white">+977-9805987922</a>
              </div>
              <div className="flex flex-col items-center">
                <FaMapMarkerAlt className="text-3xl text-pascal-orange mb-4" />
                <h4 className="font-bold mb-2">Location</h4>
                <p className="text-blue-100">Koteshowr-32, Kathmandu</p>
              </div>
            </div>
            <a
              href="https://thewisdomtechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white text-pascal-blue font-bold rounded-xl hover:bg-pascal-orange hover:text-white transition-all"
            >
              Visit Our Website
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutWisdom;
