import db from '../../config/database.js';

const createSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const getAllUniversities = (req, res) => {
  try {
    const { country_id, status, search } = req.query;
    let query = `
      SELECT u.*, c.name as country_name 
      FROM universities u 
      LEFT JOIN countries c ON u.country_id = c.id 
      WHERE 1=1
    `;
    const params = [];

    if (country_id) {
      query += ' AND u.country_id = ?';
      params.push(country_id);
    }

    if (status) {
      query += ' AND u.status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (u.name LIKE ? OR u.location LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY u.created_at DESC';

    const universities = db.prepare(query).all(...params);
    res.json(universities);
  } catch (error) {
    console.error('Get universities error:', error);
    res.status(500).json({ error: 'Failed to fetch universities' });
  }
};

export const getUniversityBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const university = db.prepare(`
      SELECT u.*, c.name as country_name 
      FROM universities u 
      LEFT JOIN countries c ON u.country_id = c.id 
      WHERE u.slug = ?
    `).get(slug);

    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    res.json(university);
  } catch (error) {
    console.error('Get university error:', error);
    res.status(500).json({ error: 'Failed to fetch university' });
  }
};

export const createUniversity = (req, res) => {
  try {
    const {
      country_id,
      name,
      location,
      website,
      programs_offered,
      tuition_fees,
      entry_requirements,
      intake_details,
      scholarship_info,
      status
    } = req.body;

    if (!name || !country_id) {
      return res.status(400).json({ error: 'University name and country are required' });
    }

    const slug = createSlug(name);
    const logo = req.file?.filename || null;

    console.log('Create university - Logo:', logo);
    console.log('File received:', req.file);

    const result = db.prepare(`
      INSERT INTO universities (
        country_id, name, slug, logo, location, website,
        programs_offered, tuition_fees, entry_requirements,
        intake_details, scholarship_info, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      country_id, name, slug, logo, location, website,
      programs_offered, tuition_fees, entry_requirements,
      intake_details, scholarship_info, status || 'active'
    );

    const university = db.prepare('SELECT * FROM universities WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(university);
  } catch (error) {
    console.error('Create university error:', error);
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'University with this name already exists' });
    }
    res.status(500).json({ error: 'Failed to create university' });
  }
};

export const updateUniversity = (req, res) => {
  try {
    const { id } = req.params;
    const {
      country_id,
      name,
      location,
      website,
      programs_offered,
      tuition_fees,
      entry_requirements,
      intake_details,
      scholarship_info,
      status
    } = req.body;

    const university = db.prepare('SELECT * FROM universities WHERE id = ?').get(id);

    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    const slug = name ? createSlug(name) : university.slug;
    // Only update logo if a new file is provided
    const logo = req.file?.filename ? req.file.filename : university.logo;

    console.log('Update university - ID:', id);
    console.log('Logo:', logo);
    console.log('File received:', req.file);

    db.prepare(`
      UPDATE universities SET
        country_id = ?, name = ?, slug = ?, logo = ?,
        location = ?, website = ?, programs_offered = ?,
        tuition_fees = ?, entry_requirements = ?, intake_details = ?,
        scholarship_info = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      country_id || university.country_id,
      name || university.name,
      slug,
      logo || null,
      location !== undefined ? location : university.location,
      website !== undefined ? website : university.website,
      programs_offered !== undefined ? programs_offered : university.programs_offered,
      tuition_fees !== undefined ? tuition_fees : university.tuition_fees,
      entry_requirements !== undefined ? entry_requirements : university.entry_requirements,
      intake_details !== undefined ? intake_details : university.intake_details,
      scholarship_info !== undefined ? scholarship_info : university.scholarship_info,
      status || university.status,
      id
    );

    const updated = db.prepare('SELECT * FROM universities WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Update university error:', error);
    res.status(500).json({ error: 'Failed to update university' });
  }
};

export const deleteUniversity = (req, res) => {
  try {
    const { id } = req.params;

    const university = db.prepare('SELECT * FROM universities WHERE id = ?').get(id);

    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    db.prepare('DELETE FROM universities WHERE id = ?').run(id);

    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    console.error('Delete university error:', error);
    res.status(500).json({ error: 'Failed to delete university' });
  }
};
