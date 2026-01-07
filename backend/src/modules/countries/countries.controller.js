import db from '../../config/database.js';
import path from 'path';
import fs from 'fs';

const createSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const getAllCountries = (req, res) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT * FROM countries WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const countries = db.prepare(query).all(...params);
    res.json(countries);
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

export const getCountryBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const country = db.prepare('SELECT * FROM countries WHERE slug = ?').get(slug);

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const universities = db.prepare(
      'SELECT * FROM universities WHERE country_id = ? AND status = ? ORDER BY name'
    ).all(country.id, 'active');

    res.json({ ...country, universities });
  } catch (error) {
    console.error('Get country error:', error);
    res.status(500).json({ error: 'Failed to fetch country' });
  }
};

export const createCountry = (req, res) => {
  try {
    const {
      name,
      short_description,
      description,
      education_system,
      cost_of_living,
      visa_info,
      status
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Country name is required' });
    }

    const slug = createSlug(name);
    const flagImage = req.files?.flag_image?.[0]?.filename || null;
    const bannerImage = req.files?.banner_image?.[0]?.filename || null;

    console.log('Create country - Flag image:', flagImage, 'Banner image:', bannerImage);
    console.log('Files received:', req.files);

    const result = db.prepare(`
      INSERT INTO countries (
        name, slug, flag_image, banner_image, short_description, 
        description, education_system, cost_of_living, visa_info, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name, slug, flagImage, bannerImage, short_description,
      description, education_system, cost_of_living, visa_info, status || 'active'
    );

    const country = db.prepare('SELECT * FROM countries WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(country);
  } catch (error) {
    console.error('Create country error:', error);
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Country with this name already exists' });
    }
    res.status(500).json({ error: 'Failed to create country' });
  }
};

export const updateCountry = (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      short_description,
      description,
      education_system,
      cost_of_living,
      visa_info,
      status
    } = req.body;

    const country = db.prepare('SELECT * FROM countries WHERE id = ?').get(id);

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const slug = name ? createSlug(name) : country.slug;
    // Only update images if new files are provided
    const flagImage = req.files?.flag_image?.[0]?.filename ? req.files.flag_image[0].filename : country.flag_image;
    const bannerImage = req.files?.banner_image?.[0]?.filename ? req.files.banner_image[0].filename : country.banner_image;

    console.log('Update country - ID:', id);
    console.log('Flag image:', flagImage, 'Banner image:', bannerImage);
    console.log('Files received:', req.files);

    db.prepare(`
      UPDATE countries SET
        name = ?, slug = ?, flag_image = ?, banner_image = ?,
        short_description = ?, description = ?, education_system = ?,
        cost_of_living = ?, visa_info = ?, status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name || country.name,
      slug,
      flagImage || null,
      bannerImage || null,
      short_description !== undefined ? short_description : country.short_description,
      description !== undefined ? description : country.description,
      education_system !== undefined ? education_system : country.education_system,
      cost_of_living !== undefined ? cost_of_living : country.cost_of_living,
      visa_info !== undefined ? visa_info : country.visa_info,
      status || country.status,
      id
    );

    const updated = db.prepare('SELECT * FROM countries WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Update country error:', error);
    res.status(500).json({ error: 'Failed to update country' });
  }
};

export const deleteCountry = (req, res) => {
  try {
    const { id } = req.params;

    const country = db.prepare('SELECT * FROM countries WHERE id = ?').get(id);

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    db.prepare('DELETE FROM countries WHERE id = ?').run(id);

    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Delete country error:', error);
    res.status(500).json({ error: 'Failed to delete country' });
  }
};
