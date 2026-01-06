import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaGlobe, FaUniversity, FaBlog, FaEnvelope, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin');
    }
  }, [loading, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (loading) return <div className="admin-loading">Loading...</div>;
  if (!user) return null;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user?.name}</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            Dashboard
          </NavLink>

          <div className="nav-section">Management</div>
          <NavLink
            to="/admin/countries"
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <FaGlobe /> Countries
          </NavLink>
          <NavLink
            to="/admin/universities"
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <FaUniversity /> Universities
          </NavLink>
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <FaBlog /> Blogs
          </NavLink>
          <NavLink
            to="/admin/enquiries"
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <FaEnvelope /> Enquiries
          </NavLink>

          <div className="nav-section">Settings</div>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <FaCog /> Site Settings
          </NavLink>

          <button onClick={handleLogout} className="nav-item logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
