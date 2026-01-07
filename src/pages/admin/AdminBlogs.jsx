import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { BACKEND_URL, blogsAPI, getApiErrorMessage } from '../../services/api';
import RichTextEditor from '../../components/admin/RichTextEditor';
import './AdminCommon.css';

const emptyForm = {
  title: '',
  category: '',
  short_description: '',
  content: '',
  meta_title: '',
  meta_description: '',
  status: 'draft',
  featured_image: null
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await blogsAPI.getAll(search ? { search } : undefined);
      setBlogs(res.data);
    } catch (e) {
      const message = getApiErrorMessage(e, 'Failed to load blogs');
      setError(message);
      toast.error(message, { id: 'blogs-load' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(
      (b) => b.title?.toLowerCase().includes(q) || b.short_description?.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const resetForm = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(false);
  };

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const startEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title || '',
      category: blog.category || '',
      short_description: blog.short_description || '',
      content: blog.content || '',
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
      status: blog.status || 'draft',
      featured_image: null
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
    setForm((prev) => ({ ...prev, featured_image: e.target.files?.[0] || null }));
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('category', form.category);
    fd.append('short_description', form.short_description);
    fd.append('content', form.content);
    fd.append('meta_title', form.meta_title);
    fd.append('meta_description', form.meta_description);
    fd.append('status', form.status);
    if (form.featured_image) fd.append('featured_image', form.featured_image);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const fd = buildFormData();
      if (editing) {
        await blogsAPI.update(editing.id, fd);
      } else {
        await blogsAPI.create(fd);
      }
      toast.success(editing ? 'Blog updated successfully' : 'Blog created successfully');
      await loadBlogs();
      resetForm();
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to save blog');
      setError(message);
      toast.error(message, { id: 'blogs-save' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete blog "${blog.title}"?`)) return;
    setError('');
    try {
      await blogsAPI.delete(blog.id);
      toast.success('Blog deleted successfully');
      await loadBlogs();
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to delete blog');
      setError(message);
      toast.error(message, { id: 'blogs-delete' });
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Blogs</h1>
        <div className="admin-actions">
          <button className="btn btn-primary" onClick={startCreate}>Add Blog</button>
          <Link to="/blog" className="btn btn-secondary">View Blog</Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {formOpen && (
        <div className="admin-card">
          <h2 style={{ marginTop: 0 }}>{editing ? 'Edit Blog' : 'Create Blog'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group span-2">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Study Tips" />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
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
              <label>Content</label>
              <RichTextEditor value={form.content} onChange={handleRichChange('content')} minHeight={260} />
            </div>

            <div className="form-group">
              <label>Meta Title</label>
              <input name="meta_title" value={form.meta_title} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Meta Description</label>
              <input name="meta_description" value={form.meta_description} onChange={handleChange} />
            </div>

            <div className="form-group span-2">
              <label>Featured Image</label>
              <input type="file" name="featured_image" accept="image/*" onChange={handleFile} />
              {editing?.featured_image && (
                <div className="admin-image-preview">
                  <img src={`${BACKEND_URL}/uploads/blogs/${editing.featured_image}`} alt="Featured" style={{ width: 54, height: 40 }} />
                  <span>Current: {editing.featured_image}</span>
                </div>
              )}
            </div>

            <div className="span-2" style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Update Blog' : 'Create Blog'}
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
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={loadBlogs} disabled={loading}>Refresh</button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Blog</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {b.featured_image ? (
                          <img
                            src={`${BACKEND_URL}/uploads/blogs/${b.featured_image}`}
                            alt="Featured"
                            style={{ width: 54, height: 40, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }}
                          />
                        ) : null}
                        <div>
                          <div style={{ fontWeight: 700, color: '#2d3748' }}>{b.title}</div>
                          <div style={{ fontSize: '0.875rem', color: '#718096' }}>{b.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`status-badge ${b.status}`}>{b.status}</span></td>
                    <td>{b.category || '—'}</td>
                    <td>{b.created_at ? new Date(b.created_at).toLocaleDateString() : '—'}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-secondary" onClick={() => startEdit(b)}>Edit</button>
                        <button className="btn btn-outline" onClick={() => handleDelete(b)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div style={{ padding: '1rem', color: '#718096' }}>No blogs found.</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
