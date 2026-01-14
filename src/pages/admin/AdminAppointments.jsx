import React, { useEffect, useMemo, useState } from 'react';
import { appointmentsAPI } from '../../services/api';
import './AdminCommon.css';

const statusOptions = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
  { value: 'completed', label: 'Completed', color: 'bg-gray-100 text-gray-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
];

const appointmentTypes = [
  { value: 'study_abroad', label: 'Study Abroad Counseling' },
  { value: 'course_selection', label: 'Course Selection' },
  { value: 'visa_guidance', label: 'Visa Guidance' },
  { value: 'test_preparation', label: 'Test Preparation' }
];

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const res = await appointmentsAPI.getAll(Object.keys(params).length ? params : undefined);
      setAppointments(res.data);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  const filtered = useMemo(() => {
    if (!search) return appointments;
    const q = search.toLowerCase();
    return appointments.filter(
      (a) =>
        a.student_name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.phone?.toLowerCase().includes(q)
    );
  }, [appointments, search]);

  const updateStatus = async (appointment, status) => {
    setError('');
    try {
      await appointmentsAPI.updateStatus(appointment.id, status);
      await load();
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to update status');
    }
  };

  const updateAppointment = async (appointment, updates) => {
    setError('');
    try {
      await appointmentsAPI.update(appointment.id, updates);
      await load();
      setSelectedAppointment(null);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to update appointment');
    }
  };

  const remove = async (appointment) => {
    if (!window.confirm(`Delete appointment from "${appointment.student_name}"?`)) return;
    setError('');
    try {
      await appointmentsAPI.delete(appointment.id);
      await load();
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to delete appointment');
    }
  };

  const getStatusColor = (status) => {
    const option = statusOptions.find(s => s.value === status);
    return option ? option.color : 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type) => {
    const option = appointmentTypes.find(t => t.value === type);
    return option ? option.label : type;
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Appointments</h1>
        <div className="admin-actions">
          <button className="btn btn-secondary" onClick={load} disabled={loading}>Refresh</button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-card">
        <div className="admin-toolbar">
          <input
            type="text"
            placeholder="Search name/email/phone..."
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
                  <th>Student</th>
                  <th>Type</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#2d3748' }}>{a.student_name}</div>
                      <div style={{ fontSize: '0.875rem' }}>{a.email}</div>
                      <div style={{ fontSize: '0.875rem', color: '#718096' }}>{a.phone}</div>
                      {a.preferred_country && (
                        <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                          🌍 {a.preferred_country}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="text-sm font-medium">{getTypeLabel(a.appointment_type)}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>{a.appointment_date}</strong>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#718096' }}>{a.appointment_time}</div>
                    </td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(a.status)}`}>
                        {statusOptions.find(s => s.value === a.status)?.label || a.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedAppointment(a)}
                        >
                          View
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => remove(a)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div style={{ padding: '1rem', color: '#718096' }}>No appointments found.</div>
            )}
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedAppointment(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Student Info */}
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem' }}>
                    STUDENT INFORMATION
                  </h3>
                  <div className="info-grid">
                    <div>
                      <label>Name</label>
                      <div>{selectedAppointment.student_name}</div>
                    </div>
                    <div>
                      <label>Email</label>
                      <div>{selectedAppointment.email}</div>
                    </div>
                    <div>
                      <label>Phone</label>
                      <div>{selectedAppointment.phone}</div>
                    </div>
                    {selectedAppointment.preferred_country && (
                      <div>
                        <label>Preferred Country</label>
                        <div>🌍 {selectedAppointment.preferred_country}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Appointment Details */}
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem' }}>
                    APPOINTMENT DETAILS
                  </h3>
                  <div className="info-grid">
                    <div>
                      <label>Type</label>
                      <div>{getTypeLabel(selectedAppointment.appointment_type)}</div>
                    </div>
                    <div>
                      <label>Date</label>
                      <div>{selectedAppointment.appointment_date}</div>
                    </div>
                    <div>
                      <label>Time</label>
                      <div>{selectedAppointment.appointment_time}</div>
                    </div>
                    <div>
                      <label>Status</label>
                      <select
                        value={selectedAppointment.status}
                        onChange={(e) => updateStatus(selectedAppointment, e.target.value)}
                        className="status-select"
                      >
                        {statusOptions.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    {selectedAppointment.assigned_counselor && (
                      <div>
                        <label>Assigned Counselor</label>
                        <div>{selectedAppointment.assigned_counselor}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedAppointment.message && (
                <div style={{ marginTop: '1rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.5rem' }}>
                    MESSAGE
                  </h3>
                  <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', whiteSpace: 'pre-wrap' }}>
                    {selectedAppointment.message}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.5rem' }}>
                  ADMIN NOTES
                </h3>
                <textarea
                  value={selectedAppointment.admin_notes || ''}
                  onChange={(e) => updateAppointment(selectedAppointment, { admin_notes: e.target.value })}
                  placeholder="Add internal notes..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Metadata */}
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <div>Created: {new Date(selectedAppointment.created_at).toLocaleString()}</div>
                {selectedAppointment.updated_at !== selectedAppointment.created_at && (
                  <div>Updated: {new Date(selectedAppointment.updated_at).toLocaleString()}</div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setSelectedAppointment(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
