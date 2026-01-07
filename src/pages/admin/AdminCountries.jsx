import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { BACKEND_URL, countriesAPI, getApiErrorMessage } from '../../services/api';
import RichTextEditor from '../../components/admin/RichTextEditor';
import './AdminCommon.css';

const emptyForm = {
  name: '',
  short_description: '',
  description: '',
  education_system: '',
  cost_of_living: '',
  visa_info: '',
  status: 'active',
  flag_image: null,
  banner_image: null
};

const AdminCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadCountries = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await countriesAPI.getAll(search ? { search } : undefined);
      setCountries(res.data);
    } catch (e) {
      const message = getApiErrorMessage(e, 'Failed to load countries');
      setError(message);
      toast.error(message, { id: 'countries-load' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) => c.name?.toLowerCase().includes(q) || c.short_description?.toLowerCase().includes(q)
    );
  }, [countries, search]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setFormOpen(false);
  };

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const startEdit = (country) => {
    setEditing(country);
    setForm({
      name: country.name || '',
      short_description: country.short_description || '',
      description: country.description || '',
      education_system: country.education_system || '',
      cost_of_living: country.cost_of_living || '',
      visa_info: country.visa_info || '',
      status: country.status || 'active',
      flag_image: null,
      banner_image: null
    });
    setFormOpen(true);
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files?.[0] || null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichChange = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('short_description', form.short_description);
    fd.append('description', form.description);
    fd.append('education_system', form.education_system);
    fd.append('cost_of_living', form.cost_of_living);
    fd.append('visa_info', form.visa_info);
    fd.append('status', form.status);
    if (form.flag_image) fd.append('flag_image', form.flag_image);
    if (form.banner_image) fd.append('banner_image', form.banner_image);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const fd = buildFormData();
      if (editing) {
        await countriesAPI.update(editing.id, fd);
      } else {
        await countriesAPI.create(fd);
      }
      toast.success(editing ? 'Country updated successfully' : 'Country created successfully');
      await loadCountries();
      resetForm();
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to save country');
      setError(message);
      toast.error(message, { id: 'countries-save' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (country) => {
    if (!window.confirm(`Delete country "${country.name}"?`)) return;
    setError('');
    try {
      await countriesAPI.delete(country.id);
      toast.success('Country deleted successfully');
      await loadCountries();
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to delete country');
      setError(message);
      toast.error(message, { id: 'countries-delete' });
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Countries</h1>
        <div className="admin-actions">
          <button className="btn btn-primary" onClick={startCreate}>Add Country</button>
          <Link to="/" className="btn btn-secondary">View Site</Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {formOpen && (
        <div className="admin-card">
          <h2 style={{ marginTop: 0 }}>{editing ? 'Edit Country' : 'Create Country'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group span-2">
              <label>Short Description</label>
              <RichTextEditor
                value={form.short_description}
                onChange={handleRichChange('short_description')}
                minHeight={120}
              />
            </div>
            <div className="form-group span-2">
              <label>Description</label>
              <RichTextEditor
                value={form.description}
                onChange={handleRichChange('description')}
                minHeight={180}
              />
            </div>
            <div className="form-group span-2">
              <label>Education System</label>
              <RichTextEditor
                value={form.education_system}
                onChange={handleRichChange('education_system')}
                minHeight={160}
              />
            </div>
            <div className="form-group span-2">
              <label>Cost of Living</label>
              <RichTextEditor
                value={form.cost_of_living}
                onChange={handleRichChange('cost_of_living')}
                minHeight={160}
              />
            </div>
            <div className="form-group span-2">
              <label>Visa Info</label>
              <RichTextEditor
                value={form.visa_info}
                onChange={handleRichChange('visa_info')}
                minHeight={160}
              />
            </div>

            <div className="form-group">
              <label>Flag Image</label>
              <input type="file" name="flag_image" accept="image/*" onChange={handleFile} />
              {editing?.flag_image && (
                <div className="admin-image-preview">
                  <img src={`${BACKEND_URL}/uploads/countries/${editing.flag_image}`} alt="Flag" />
                  <span>Current: {editing.flag_image}</span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Banner Image</label>
              <input type="file" name="banner_image" accept="image/*" onChange={handleFile} />
              {editing?.banner_image && (
                <div className="admin-image-preview">
                  <img src={`${BACKEND_URL}/uploads/countries/${editing.banner_image}`} alt="Banner" />
                  <span>Current: {editing.banner_image}</span>
                </div>
              )}
            </div>

            <div className="span-2" style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Update Country' : 'Create Country'}
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
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={loadCountries} disabled={loading}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((country) => (
                  <tr key={country.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {country.flag_image ? (
                          <img
                            src={`${BACKEND_URL}/uploads/countries/${country.flag_image}`}
                            alt="Flag"
                            style={{ width: 44, height: 30, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }}
                          />
                        ) : null}
                        <div>
                          <div style={{ fontWeight: 700, color: '#2d3748' }}>{country.name}</div>
                          <div style={{ fontSize: '0.875rem', color: '#718096' }}>{country.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${country.status}`}>{country.status}</span>
                    </td>
                    <td>{country.created_at ? new Date(country.created_at).toLocaleDateString() : '—'}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-secondary" onClick={() => startEdit(country)}>Edit</button>
                        <button className="btn btn-outline" onClick={() => handleDelete(country)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && <div style={{ padding: '1rem', color: '#718096' }}>No countries found.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCountries;
