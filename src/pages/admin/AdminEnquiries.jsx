import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { enquiriesAPI } from '../../services/api';
import './AdminCommon.css';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'contacted', label: 'Contacted' }
];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const res = await enquiriesAPI.getAll(Object.keys(params).length ? params : undefined);
      setEnquiries(res.data);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  const filtered = useMemo(() => {
    if (!search) return enquiries;
    const q = search.toLowerCase();
    return enquiries.filter(
      (e) => e.name?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q) || e.country_name?.toLowerCase().includes(q)
    );
  }, [enquiries, search]);

  const updateStatus = async (enquiry, status) => {
    setError('');
    try {
      await enquiriesAPI.updateStatus(enquiry.id, status);
      await load();
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to update status');
    }
  };

  const remove = async (enquiry) => {
    if (!window.confirm(`Delete enquiry from "${enquiry.name}"?`)) return;
    setError('');
    try {
      await enquiriesAPI.delete(enquiry.id);
      await load();
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to delete enquiry');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Enquiries</h1>
        <div className="admin-actions">
          <button className="btn btn-secondary" onClick={load} disabled={loading}>Refresh</button>
          <Link to="/contact" className="btn btn-outline">View Contact Page</Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-card">
        <div className="admin-toolbar">
          <input
            placeholder="Search name/email/country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Country</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#2d3748' }}>{e.name}</div>
                      <div style={{ fontSize: '0.875rem' }}>{e.email}</div>
                      {e.phone && <div style={{ fontSize: '0.875rem', color: '#718096' }}>{e.phone}</div>}
                    </td>
                    <td>{e.country_name || '—'}</td>
                    <td style={{ maxWidth: 380 }}>{e.message || '—'}</td>
                    <td>
                      <select value={e.status} onChange={(ev) => updateStatus(e, ev.target.value)}>
                        {statusOptions.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td>{e.created_at ? new Date(e.created_at).toLocaleString() : '—'}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-outline" onClick={() => remove(e)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && <div style={{ padding: '1rem', color: '#718096' }}>No enquiries found.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
