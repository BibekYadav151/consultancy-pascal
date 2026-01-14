import db from '../../config/database.js';

export const appointmentModel = {
  getAll: () => {
    return db.prepare('SELECT * FROM appointments ORDER BY created_at DESC').all();
  },

  getById: (id) => {
    return db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  },

  create: (appointmentData) => {
    const {
      student_name,
      email,
      phone,
      appointment_type,
      appointment_date,
      appointment_time,
      preferred_country,
      message
    } = appointmentData;

    const result = db.prepare(`
      INSERT INTO appointments (
        student_name, email, phone, appointment_type, 
        appointment_date, appointment_time, preferred_country, message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      student_name,
      email,
      phone,
      appointment_type,
      appointment_date,
      appointment_time,
      preferred_country || null,
      message || null
    );

    return db.prepare('SELECT * FROM appointments WHERE id = ?').get(result.lastInsertRowid);
  },

  update: (id, appointmentData) => {
    const fields = [];
    const values = [];

    Object.keys(appointmentData).forEach(key => {
      if (appointmentData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(appointmentData[key]);
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    db.prepare(`
      UPDATE appointments 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(...values);

    return db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  },

  delete: (id) => {
    return db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
  },

  updateStatus: (id, status) => {
    db.prepare(`
      UPDATE appointments 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(status, id);

    return db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  }
};

export default appointmentModel;
