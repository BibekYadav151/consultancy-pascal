import db from '../../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const getAllClasses = (req, res) => {
  try {
    const { status, level } = req.query;
    let query = 'SELECT * FROM classes WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (level) {
      query += ' AND level = ?';
      params.push(level);
    }

    query += ' ORDER BY created_at DESC';

    const classes = db.prepare(query).all(...params);
    res.json({ success: true, data: classes });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ success: false, message: 'Error fetching classes', error: error.message });
  }
};

export const getClassBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const classData = db.prepare('SELECT * FROM classes WHERE slug = ?').get(slug);

    if (!classData) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    res.json({ success: true, data: classData });
  } catch (error) {
    console.error('Get class error:', error);
    res.status(500).json({ success: false, message: 'Error fetching class', error: error.message });
  }
};

export const createClass = (req, res) => {
  try {
    const { title, short_description, description, duration, level, instructor, price, schedule, status } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const slug = generateSlug(title);
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const stmt = db.prepare(`
      INSERT INTO classes (title, slug, image, short_description, description, duration, level, instructor, price, schedule, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      slug,
      image,
      short_description || '',
      description || '',
      duration || '',
      level || '',
      instructor || '',
      price || '',
      schedule || '',
      status || 'active'
    );

    const newClass = db.prepare('SELECT * FROM classes WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    console.error('Create class error:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Error creating class', error: error.message });
  }
};

export const updateClass = (req, res) => {
  try {
    const { id } = req.params;
    const { title, short_description, description, duration, level, instructor, price, schedule, status } = req.body;

    const existingClass = db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
    if (!existingClass) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const slug = title ? generateSlug(title) : existingClass.slug;
    const image = req.file ? `/uploads/${req.file.filename}` : existingClass.image;

    if (req.file && existingClass.image) {
      const oldImagePath = path.join(__dirname, '../../../', existingClass.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const stmt = db.prepare(`
      UPDATE classes 
      SET title = ?, slug = ?, image = ?, short_description = ?, description = ?, 
          duration = ?, level = ?, instructor = ?, price = ?, schedule = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      title || existingClass.title,
      slug,
      image,
      short_description !== undefined ? short_description : existingClass.short_description,
      description !== undefined ? description : existingClass.description,
      duration !== undefined ? duration : existingClass.duration,
      level !== undefined ? level : existingClass.level,
      instructor !== undefined ? instructor : existingClass.instructor,
      price !== undefined ? price : existingClass.price,
      schedule !== undefined ? schedule : existingClass.schedule,
      status || existingClass.status,
      id
    );

    const updatedClass = db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
    res.json({ success: true, data: updatedClass });
  } catch (error) {
    console.error('Update class error:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Error updating class', error: error.message });
  }
};

export const deleteClass = (req, res) => {
  try {
    const { id } = req.params;

    const existingClass = db.prepare('SELECT * FROM classes WHERE id = ?').get(id);
    if (!existingClass) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    if (existingClass.image) {
      const imagePath = path.join(__dirname, '../../../', existingClass.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    db.prepare('DELETE FROM classes WHERE id = ?').run(id);
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({ success: false, message: 'Error deleting class', error: error.message });
  }
};
