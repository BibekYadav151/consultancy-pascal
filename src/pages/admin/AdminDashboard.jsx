import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaGraduationCap, FaEnvelope, FaChartLine } from 'react-icons/fa';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/partner/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard Overview</h1>
        <Link to="/" className="btn btn-secondary">View Site</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaBook className="stat-icon" style={{ color: '#3B82F6' }} />
          <div>
            <h3>{stats?.totalClasses || 0}</h3>
            <p>Total Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <FaGraduationCap className="stat-icon" style={{ color: '#9333EA' }} />
          <div>
            <h3>{stats?.totalPrograms || 0}</h3>
            <p>Total Programs</p>
          </div>
        </div>
        <div className="stat-card">
          <FaEnvelope className="stat-icon" style={{ color: '#EF4444' }} />
          <div>
            <h3>{stats?.totalEnquiries || 0}</h3>
            <p>Total Enquiries</p>
            {stats?.newEnquiries > 0 && (
              <span className="badge">{stats.newEnquiries} new</span>
            )}
          </div>
        </div>
        <div className="stat-card">
          <FaChartLine className="stat-icon" style={{ color: '#10B981' }} />
          <div>
            <h3>{(stats?.totalClasses || 0) + (stats?.totalPrograms || 0)}</h3>
            <p>Total Content</p>
          </div>
        </div>
      </div>

      <div className="recent-enquiries">
        <h2>Recent Enquiries</h2>
        {stats?.recentEnquiries?.length > 0 ? (
          <div className="enquiries-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>{enquiry.name}</td>
                    <td>{enquiry.email}</td>
                    <td>{enquiry.phone || 'N/A'}</td>
                    <td>{enquiry.subject || 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${enquiry.status}`}>{enquiry.status}</span>
                    </td>
                    <td>{new Date(enquiry.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No enquiries yet.</p>
        )}
        <Link to="/admin/enquiries" className="btn btn-outline">View All Enquiries</Link>
      </div>

      <div className="quick-actions" style={{ marginTop: '2rem' }}>
        <h2>Quick Actions</h2>
        <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/admin/classes" className="action-card">
            <FaBook size={24} />
            <span>Manage Classes</span>
          </Link>
          <Link to="/admin/programs" className="action-card">
            <FaGraduationCap size={24} />
            <span>Manage Programs</span>
          </Link>
          <Link to="/admin/enquiries" className="action-card">
            <FaEnvelope size={24} />
            <span>View Enquiries</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
