import db from '../../config/database.js';

export const getDashboardStats = (req, res) => {
  try {
    const classesCount = db.prepare('SELECT COUNT(*) as count FROM classes').get();
    const programsCount = db.prepare('SELECT COUNT(*) as count FROM programs').get();
    const enquiriesCount = db.prepare('SELECT COUNT(*) as count FROM enquiries').get();
    const newEnquiriesCount = db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = "new"').get();
    const appointmentsCount = db.prepare('SELECT COUNT(*) as count FROM appointments').get();
    const newAppointmentsCount = db.prepare('SELECT COUNT(*) as count FROM appointments WHERE status = "new"').get();

    const recentEnquiries = db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5').all();

    const stats = {
      totalClasses: classesCount.count,
      totalPrograms: programsCount.count,
      totalEnquiries: enquiriesCount.count,
      newEnquiries: newEnquiriesCount.count,
      totalAppointments: appointmentsCount.count,
      newAppointments: newAppointmentsCount.count,
      recentEnquiries
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Error fetching dashboard stats', error: error.message });
  }
};
