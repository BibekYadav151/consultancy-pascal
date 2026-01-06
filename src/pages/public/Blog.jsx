import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL, blogsAPI } from '../../services/api';
import RichTextContent from '../../components/common/RichTextContent';
import './Blog.css';

const stripHtml = (html = '') => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.getAll({ status: 'published' })
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch blogs:', error);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.short_description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blog-page">
      <section className="page-hero">
        <div className="container">
          <h1>Blog & Updates</h1>
          <p>Stay informed with the latest education news and tips</p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="blogs-grid">
              {filteredBlogs.map(blog => (
                <Link to={`/blog/${blog.slug}`} key={blog.id} className="blog-card">
                  {blog.featured_image && (
                    <img src={`${BACKEND_URL}/uploads/blogs/${blog.featured_image}`} alt={blog.title} />
                  )}
                  <div className="blog-content-card">
                    {blog.category && <span className="blog-category">{blog.category}</span>}
                    <h3>{blog.title}</h3>
                    <p>{stripHtml(blog.short_description)}</p>
                    <span className="read-more">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredBlogs.length === 0 && (
            <div className="no-results">
              <p>No blogs found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.getBySlug(slug)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch blog:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!blog) return <div className="error">Blog not found</div>;

  return (
    <div className="blog-detail-page">
      <article className="blog-article">
        <div className="container">
          {blog.featured_image && (
            <img
              src={`${BACKEND_URL}/uploads/blogs/${blog.featured_image}`}
              alt={blog.title}
              className="featured-image"
            />
          )}
          <div className="article-header">
            {blog.category && <span className="blog-category">{blog.category}</span>}
            <h1>{blog.title}</h1>
            <p className="blog-date">
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="article-content">
            <RichTextContent html={blog.content} />
          </div>
          <div className="article-footer">
            <Link to="/blog" className="btn btn-outline">← Back to Blog</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Blog;
