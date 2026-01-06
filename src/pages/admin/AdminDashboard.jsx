import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaUniversity, FaBlog, FaEnvelope } from 'react-icons/fa';
import { settingsAPI } from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsAPI.getDashboardStats()
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch stats:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard Overview</h1>
        <Link to="/" className="btn btn-secondary">View Site</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaGlobe className="stat-icon" />
          <div>
            <h3>{stats?.stats?.countries || 0}</h3>
            <p>Active Countries</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUniversity className="stat-icon" />
          <div>
            <h3>{stats?.stats?.universities || 0}</h3>
            <p>Universities</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBlog className="stat-icon" />
          <div>
            <h3>{stats?.stats?.blogs || 0}</h3>
            <p>Published Blogs</p>
          </div>
        </div>
        <div className="stat-card">
          <FaEnvelope className="stat-icon" />
          <div>
            <h3>{stats?.stats?.enquiries || 0}</h3>
            <p>Total Enquiries</p>
            {stats?.stats?.newEnquiries > 0 && (
              <span className="badge">{stats.stats.newEnquiries} new</span>
            )}
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
                  <th>Country</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>{enquiry.name}</td>
                    <td>{enquiry.email}</td>
                    <td>{enquiry.country_name || 'N/A'}</td>
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
    </div>
  );
};

export default AdminDashboard;
