import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

import PublicLayout from "./components/layout/PublicLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Classes, { ClassDetail } from "./pages/public/Classes";
import Programs, { ProgramDetail } from "./pages/public/Programs";
import Contact from "./pages/public/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="classes" element={<Classes />} />
            <Route path="classes/:slug" element={<ClassDetail />} />
            <Route path="programs" element={<Programs />} />
            <Route path="programs/:slug" element={<ProgramDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
