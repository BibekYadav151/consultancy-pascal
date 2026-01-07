import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { BACKEND_URL, countriesAPI, getApiErrorMessage, universitiesAPI } from '../../services/api';
import RichTextEditor from '../../components/admin/RichTextEditor';
import './AdminCommon.css';

const emptyForm = {
  country_id: '',
  name: '',
  location: '',
  website: '',
  programs_offered: '',
  tuition_fees: '',
  entry_requirements: '',
  intake_details: '',
  scholarship_info: '',
  status: 'active',
  logo: null
};

const AdminUniversities = () => {
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [cRes, uRes] = await Promise.all([
        countriesAPI.getAll(),
        universitiesAPI.getAll(countryFilter ? { country_id: countryFilter } : undefined)
      ]);
      setCountries(cRes.data);
      setUniversities(uRes.data);
    } catch (e) {
      const message = getApiErrorMessage(e, 'Failed to load universities');
      setError(message);
      toast.error(message, { id: 'universities-load' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [countryFilter]);

  const filtered = useMemo(() => {
    if (!search) return universities;
    const q = search.toLowerCase();
    return universities.filter(
      (u) => u.name?.toLowerCase().includes(q) || u.location?.toLowerCase().includes(q) || u.country_name?.toLowerCase().includes(q)
    );
  }, [universities, search]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setFormOpen(false);
  };

  const startCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, country_id: countries[0]?.id ? String(countries[0].id) : '' });
    setFormOpen(true);
  };

  const startEdit = (uni) => {
    setEditing(uni);
    setForm({
      country_id: String(uni.country_id || ''),
      name: uni.name || '',
      location: uni.location || '',
      website: uni.website || '',
      programs_offered: uni.programs_offered || '',
      tuition_fees: uni.tuition_fees || '',
      entry_requirements: uni.entry_requirements || '',
      intake_details: uni.intake_details || '',
      scholarship_info: uni.scholarship_info || '',
      status: uni.status || 'active',
      logo: null
    });
    setFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichChange = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, logo: e.target.files?.[0] || null }));
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('country_id', form.country_id);
    fd.append('name', form.name);
    fd.append('location', form.location);
    fd.append('website', form.website);
    fd.append('programs_offered', form.programs_offered);
    fd.append('tuition_fees', form.tuition_fees);
    fd.append('entry_requirements', form.entry_requirements);
    fd.append('intake_details', form.intake_details);
    fd.append('scholarship_info', form.scholarship_info);
    fd.append('status', form.status);
    if (form.logo) fd.append('logo', form.logo);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const fd = buildFormData();
      if (editing) {
        await universitiesAPI.update(editing.id, fd);
      } else {
        await universitiesAPI.create(fd);
      }
      toast.success(editing ? 'University updated successfully' : 'University created successfully');
      await load();
      resetForm();
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to save university');
      setError(message);
      toast.error(message, { id: 'universities-save' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (uni) => {
    if (!window.confirm(`Delete university "${uni.name}"?`)) return;
    setError('');
    try {
      await universitiesAPI.delete(uni.id);
      toast.success('University deleted successfully');
      await load();
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to delete university');
      setError(message);
      toast.error(message, { id: 'universities-delete' });
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Universities</h1>
        <div className="admin-actions">
          <button className="btn btn-primary" onClick={startCreate} disabled={countries.length === 0}>
            Add University
          </button>
          <Link to="/" className="btn btn-secondary">View Site</Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {countries.length === 0 && (
        <div className="alert alert-error">Please create at least one country before adding universities.</div>
      )}

      {formOpen && (
        <div className="admin-card">
          <h2 style={{ marginTop: 0 }}>{editing ? 'Edit University' : 'Create University'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Country *</label>
              <select name="country_id" value={form.country_id} onChange={handleChange} required>
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group span-2">
              <label>Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input name="website" value={form.website} onChange={handleChange} placeholder="https://" />
            </div>

            <div className="form-group span-2">
              <label>Programs Offered</label>
              <RichTextEditor
                value={form.programs_offered}
                onChange={handleRichChange('programs_offered')}
                minHeight={160}
              />
            </div>

            <div className="form-group span-2">
              <label>Tuition Fees</label>
              <RichTextEditor
                value={form.tuition_fees}
                onChange={handleRichChange('tuition_fees')}
                minHeight={120}
              />
            </div>

            <div className="form-group span-2">
              <label>Intake Details</label>
              <RichTextEditor
                value={form.intake_details}
                onChange={handleRichChange('intake_details')}
                minHeight={120}
              />
            </div>

            <div className="form-group span-2">
              <label>Entry Requirements</label>
              <RichTextEditor
                value={form.entry_requirements}
                onChange={handleRichChange('entry_requirements')}
                minHeight={160}
              />
            </div>

            <div className="form-group span-2">
              <label>Scholarship Info</label>
              <RichTextEditor
                value={form.scholarship_info}
                onChange={handleRichChange('scholarship_info')}
                minHeight={160}
              />
            </div>

            <div className="form-group span-2">
              <label>Logo</label>
              <input type="file" name="logo" accept="image/*" onChange={handleFile} />
              {editing?.logo && (
                <div className="admin-image-preview">
                  <img src={`${BACKEND_URL}/uploads/universities/${editing.logo}`} alt="Logo" style={{ width: 44, height: 44, objectFit: 'contain' }} />
                  <span>Current: {editing.logo}</span>
                </div>
              )}
            </div>

            <div className="span-2" style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Update University' : 'Create University'}
              </button>
              <button className="btn btn-outline" type="button" onClick={resetForm} disabled={saving}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-toolbar">
          <input
            placeholder="Search universities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button className="btn btn-secondary" onClick={load} disabled={loading}>Refresh</button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>University</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {u.logo ? (
                          <img
                            src={`${BACKEND_URL}/uploads/universities/${u.logo}`}
                            alt="Logo"
                            style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white' }}
                          />
                        ) : null}
                        <div>
                          <div style={{ fontWeight: 700, color: '#2d3748' }}>{u.name}</div>
                          <div style={{ fontSize: '0.875rem', color: '#718096' }}>{u.location || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.country_name || '—'}</td>
                    <td><span className={`status-badge ${u.status}`}>{u.status}</span></td>
                    <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-secondary" onClick={() => startEdit(u)}>Edit</button>
                        <button className="btn btn-outline" onClick={() => handleDelete(u)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && <div style={{ padding: '1rem', color: '#718096' }}>No universities found.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUniversities;
