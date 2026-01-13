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

export const getAllPrograms = (req, res) => {
  try {
    const { status, category } = req.query;
    let query = 'SELECT * FROM programs WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const programs = db.prepare(query).all(...params);
    res.json({ success: true, data: programs });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({ success: false, message: 'Error fetching programs', error: error.message });
  }
};

export const getProgramBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const program = db.prepare('SELECT * FROM programs WHERE slug = ?').get(slug);

    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    res.json({ success: true, data: program });
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({ success: false, message: 'Error fetching program', error: error.message });
  }
};

export const createProgram = (req, res) => {
  try {
    const { title, short_description, description, duration, category, eligibility, fee_structure, features, status } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const slug = generateSlug(title);
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const stmt = db.prepare(`
      INSERT INTO programs (title, slug, image, short_description, description, duration, category, eligibility, fee_structure, features, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      slug,
      image,
      short_description || '',
      description || '',
      duration || '',
      category || '',
      eligibility || '',
      fee_structure || '',
      features || '',
      status || 'active'
    );

    const newProgram = db.prepare('SELECT * FROM programs WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: newProgram });
  } catch (error) {
    console.error('Create program error:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Error creating program', error: error.message });
  }
};

export const updateProgram = (req, res) => {
  try {
    const { id } = req.params;
    const { title, short_description, description, duration, category, eligibility, fee_structure, features, status } = req.body;

    const existingProgram = db.prepare('SELECT * FROM programs WHERE id = ?').get(id);
    if (!existingProgram) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    const slug = title ? generateSlug(title) : existingProgram.slug;
    const image = req.file ? `/uploads/${req.file.filename}` : existingProgram.image;

    if (req.file && existingProgram.image) {
      const oldImagePath = path.join(__dirname, '../../../', existingProgram.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const stmt = db.prepare(`
      UPDATE programs 
      SET title = ?, slug = ?, image = ?, short_description = ?, description = ?, 
          duration = ?, category = ?, eligibility = ?, fee_structure = ?, features = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      title || existingProgram.title,
      slug,
      image,
      short_description !== undefined ? short_description : existingProgram.short_description,
      description !== undefined ? description : existingProgram.description,
      duration !== undefined ? duration : existingProgram.duration,
      category !== undefined ? category : existingProgram.category,
      eligibility !== undefined ? eligibility : existingProgram.eligibility,
      fee_structure !== undefined ? fee_structure : existingProgram.fee_structure,
      features !== undefined ? features : existingProgram.features,
      status || existingProgram.status,
      id
    );

    const updatedProgram = db.prepare('SELECT * FROM programs WHERE id = ?').get(id);
    res.json({ success: true, data: updatedProgram });
  } catch (error) {
    console.error('Update program error:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Error updating program', error: error.message });
  }
};

export const deleteProgram = (req, res) => {
  try {
    const { id } = req.params;

    const existingProgram = db.prepare('SELECT * FROM programs WHERE id = ?').get(id);
    if (!existingProgram) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    if (existingProgram.image) {
      const imagePath = path.join(__dirname, '../../../', existingProgram.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    db.prepare('DELETE FROM programs WHERE id = ?').run(id);
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({ success: false, message: 'Error deleting program', error: error.message });
  }
};
