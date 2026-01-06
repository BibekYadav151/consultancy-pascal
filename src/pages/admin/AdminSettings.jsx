import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { settingsAPI } from '../../services/api';
import './AdminCommon.css';

const fields = [
  { key: 'site_name', label: 'Site Name' },
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'contact_phone', label: 'Contact Phone' },
  { key: 'contact_address', label: 'Contact Address', type: 'textarea', span: 2 },
  { key: 'office_hours', label: 'Office Hours' },
  { key: 'whatsapp_number', label: 'WhatsApp Number' },
  { key: 'facebook_url', label: 'Facebook URL' },
  { key: 'twitter_url', label: 'Twitter/X URL' },
  { key: 'instagram_url', label: 'Instagram URL' },
  { key: 'linkedin_url', label: 'LinkedIn URL' }
];

const AdminSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await settingsAPI.getAll();
      setSettings(res.data || {});
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await settingsAPI.update(settings);
      setSuccess(true);
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Site Settings</h1>
        <div className="admin-actions">
          <button className="btn btn-secondary" onClick={load} disabled={loading}>Refresh</button>
          <Link to="/" className="btn btn-outline">View Site</Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">Settings updated successfully.</div>}

      <div className="admin-card">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form onSubmit={handleSave} className="admin-form">
            {fields.map((f) => (
              <div key={f.key} className={`form-group${f.span === 2 ? ' span-2' : ''}`}>
                <label>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea name={f.key} value={settings[f.key] || ''} onChange={handleChange} />
                ) : (
                  <input name={f.key} value={settings[f.key] || ''} onChange={handleChange} />
                )}
              </div>
            ))}

            <div className="span-2" style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
