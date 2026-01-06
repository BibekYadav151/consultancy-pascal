import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import PublicLayout from './components/layout/PublicLayout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Destinations, { CountryDetail } from './pages/public/Destinations';
import Universities, { UniversityDetail } from './pages/public/Universities';
import Blog, { BlogDetail } from './pages/public/Blog';
import Contact from './pages/public/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCountries from './pages/admin/AdminCountries';
import AdminUniversities from './pages/admin/AdminUniversities';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminSettings from './pages/admin/AdminSettings';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="countries" element={<AdminCountries />} />
            <Route path="universities" element={<AdminUniversities />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="destinations/:slug" element={<CountryDetail />} />
            <Route path="universities" element={<Universities />} />
            <Route path="universities/:slug" element={<UniversityDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
