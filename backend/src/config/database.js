import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../data/consultancy.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

const initDatabase = async () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      image TEXT,
      short_description TEXT,
      description TEXT,
      duration TEXT,
      level TEXT,
      instructor TEXT,
      price TEXT,
      schedule TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      image TEXT,
      short_description TEXT,
      description TEXT,
      duration TEXT,
      category TEXT,
      eligibility TEXT,
      fee_structure TEXT,
      features TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_classes_slug ON classes(slug);
    CREATE INDEX IF NOT EXISTS idx_classes_status ON classes(status);
    CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
    CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
    CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
  `);

  const checkAdmin = db.prepare('SELECT COUNT(*) as count FROM admins').get();
  if (checkAdmin.count === 0) {
    const bcryptModule = await import('bcryptjs');
    const bcrypt = bcryptModule.default;
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare(`
      INSERT INTO admins (email, password, name, role) 
      VALUES (?, ?, ?, ?)
    `).run('admin@education.com', hashedPassword, 'Admin User', 'admin');
    console.log('✅ Default admin created: admin@education.com / admin123');
  }

  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get();
  if (settingsCount.count === 0) {
    const defaultSettings = [
      { key: 'site_name', value: 'Education Platform' },
      { key: 'contact_email', value: 'info@education.com' },
      { key: 'contact_phone', value: '+1-234-567-8900' },
      { key: 'contact_address', value: '123 Education Street, City, Country' },
      { key: 'whatsapp_number', value: '+1234567890' },
      { key: 'facebook_url', value: 'https://facebook.com/education' },
      { key: 'twitter_url', value: 'https://twitter.com/education' },
      { key: 'instagram_url', value: 'https://instagram.com/education' },
      { key: 'linkedin_url', value: 'https://linkedin.com/company/education' },
      { key: 'office_hours', value: 'Mon-Fri: 9:00 AM - 5:00 PM' }
    ];
    
    const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
    defaultSettings.forEach(setting => {
      insertSetting.run(setting.key, setting.value);
    });
    console.log('✅ Default settings initialized');
  }
};

(async () => {
  try {
    await initDatabase();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
})();

export default db;
