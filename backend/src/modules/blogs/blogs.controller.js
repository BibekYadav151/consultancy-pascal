import db from '../../config/database.js';

const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const getAllBlogs = (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = 'SELECT * FROM blogs WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const blogs = db.prepare(query).all(...params);
    res.json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getBlogBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const blog = db.prepare('SELECT * FROM blogs WHERE slug = ?').get(slug);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

export const createBlog = (req, res) => {
  try {
    const {
      title,
      short_description,
      content,
      category,
      meta_title,
      meta_description,
      status
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Blog title is required' });
    }

    const slug = createSlug(title);
    const featuredImage = req.file?.filename || null;

    console.log('Create blog - Featured image:', featuredImage);
    console.log('File received:', req.file);

    const result = db.prepare(`
      INSERT INTO blogs (
        title, slug, featured_image, short_description, content,
        category, meta_title, meta_description, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, slug, featuredImage, short_description, content,
      category, meta_title || title, meta_description || short_description,
      status || 'draft'
    );

    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Blog with this title already exists' });
    }
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

export const updateBlog = (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      short_description,
      content,
      category,
      meta_title,
      meta_description,
      status
    } = req.body;

    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const slug = title ? createSlug(title) : blog.slug;
    // Only update featured_image if a new file is provided
    const featuredImage = req.file?.filename ? req.file.filename : blog.featured_image;

    console.log('Update blog - ID:', id);
    console.log('Featured image:', featuredImage);
    console.log('File received:', req.file);

    db.prepare(`
      UPDATE blogs SET
        title = ?, slug = ?, featured_image = ?,
        short_description = ?, content = ?, category = ?,
        meta_title = ?, meta_description = ?, status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title || blog.title,
      slug,
      featuredImage || null,
      short_description !== undefined ? short_description : blog.short_description,
      content !== undefined ? content : blog.content,
      category !== undefined ? category : blog.category,
      meta_title !== undefined ? meta_title : blog.meta_title,
      meta_description !== undefined ? meta_description : blog.meta_description,
      status || blog.status,
      id
    );

    const updated = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

export const deleteBlog = (req, res) => {
  try {
    const { id } = req.params;

    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    db.prepare('DELETE FROM blogs WHERE id = ?').run(id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};
