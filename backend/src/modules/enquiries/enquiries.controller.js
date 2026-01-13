import db from '../../config/database.js';

export const getAllEnquiries = (req, res) => {
  try {
    const { status, start_date, end_date } = req.query;
    let query = 'SELECT * FROM enquiries WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (start_date) {
      query += ' AND DATE(created_at) >= DATE(?)';
      params.push(start_date);
    }

    if (end_date) {
      query += ' AND DATE(created_at) <= DATE(?)';
      params.push(end_date);
    }

    query += ' ORDER BY created_at DESC';

    const enquiries = db.prepare(query).all(...params);
    res.json(enquiries);
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
};

export const getEnquiryById = (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.json(enquiry);
  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({ error: 'Failed to fetch enquiry' });
  }
};

export const createEnquiry = (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const result = db.prepare(`
      INSERT INTO enquiries (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone, subject || '', message);

    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(enquiry);
  } catch (error) {
    console.error('Create enquiry error:', error);
    res.status(500).json({ error: 'Failed to create enquiry' });
  }
};

export const updateEnquiryStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    db.prepare(`
      UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(status, id);

    const updated = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Update enquiry error:', error);
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
};

export const deleteEnquiry = (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);

    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
};

export const getEnquiryStats = (req, res) => {
  try {
    const stats = {
      total: db.prepare('SELECT COUNT(*) as count FROM enquiries').get().count,
      new: db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = ?').get('new').count,
      inProgress: db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = ?').get('in_progress').count,
      contacted: db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = ?').get('contacted').count
    };

    res.json(stats);
  } catch (error) {
    console.error('Get enquiry stats error:', error);
    res.status(500).json({ error: 'Failed to fetch enquiry stats' });
  }
};
