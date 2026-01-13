import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BACKEND_URL, blogsAPI } from '../../services/api';
import RichTextContent from '../../components/common/RichTextContent';
import { FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.getAll({ status: 'published' })
      .then(response => {
        setBlogs(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch blogs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="bg-pascal-blue py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Latest Updates & News</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stay informed with the latest news, guides, and tips for your international education journey.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pascal-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map(blog => (
                <article key={blog.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                  <Link to={`/blog/${blog.slug}`} className="block h-64 overflow-hidden">
                    {blog.featured_image ? (
                      <img 
                        src={`${BACKEND_URL}/uploads/blogs/${blog.featured_image}`} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100"></div>
                    )}
                  </Link>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(blog.created_at).toLocaleDateString()}</span>
                      {blog.category && <span className="flex items-center gap-1 text-pascal-orange"><FaTag /> {blog.category}</span>}
                    </div>
                    <Link to={`/blog/${blog.slug}`}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-pascal-blue transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {blog.short_description}
                    </p>
                    <Link to={`/blog/${blog.slug}`} className="mt-auto text-pascal-blue font-bold flex items-center gap-2 group">
                      Read More <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900">No blog posts found.</h3>
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

  if (loading) return (
    <div className="pt-40 flex justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pascal-blue"></div>
    </div>
  );
  if (!blog) return <div className="pt-40 text-center min-h-screen">Blog post not found</div>;

  return (
    <div className="pt-20 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-6 text-sm font-bold text-pascal-orange uppercase tracking-[0.2em] mb-6">
              <span>{blog.category || 'Educational'}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-gray-500 font-medium">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
              {blog.title}
            </h1>
          </div>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-16">
              <img 
                src={`${BACKEND_URL}/uploads/blogs/${blog.featured_image}`} 
                alt={blog.title} 
                className="w-full object-cover max-h-[600px]"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-pascal-blue">
            <RichTextContent html={blog.content} />
          </div>

          {/* Author Card Placeholder */}
          <div className="mt-20 p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <img src="https://i.pravatar.cc/150?u=pascal" alt="Author" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Pascal Editorial Team</h4>
              <p className="text-gray-600">Expert advisors and educators dedicated to providing you with the most accurate information on international education.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
