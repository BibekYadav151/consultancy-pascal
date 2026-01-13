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

    CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      flag_image TEXT,
      banner_image TEXT,
      short_description TEXT,
      description TEXT,
      education_system TEXT,
      cost_of_living TEXT,
      visa_info TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS universities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      logo TEXT,
      location TEXT,
      website TEXT,
      programs_offered TEXT,
      tuition_fees TEXT,
      entry_requirements TEXT,
      intake_details TEXT,
      scholarship_info TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      featured_image TEXT,
      short_description TEXT,
      content TEXT,
      category TEXT,
      meta_title TEXT,
      meta_description TEXT,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      country_id INTEGER,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_countries_slug ON countries(slug);
    CREATE INDEX IF NOT EXISTS idx_countries_status ON countries(status);
    CREATE INDEX IF NOT EXISTS idx_universities_slug ON universities(slug);
    CREATE INDEX IF NOT EXISTS idx_universities_country ON universities(country_id);
    CREATE INDEX IF NOT EXISTS idx_universities_status ON universities(status);
    CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
    CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
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
    `).run('admin@pascal.edu.np', hashedPassword, 'Pascal Admin', 'admin');
    console.log('✅ Default admin created: admin@pascal.edu.np / admin123');
  }

  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get();
  if (settingsCount.count === 0) {
    const defaultSettings = [
      { key: 'site_name', value: 'Pascal Education Consultancy' },
      { key: 'contact_email', value: 'info@pascal.edu.np' },
      { key: 'contact_phone', value: '+977-1-4412345' },
      { key: 'contact_address', value: 'Putalisadak, Kathmandu, Nepal' },
      { key: 'whatsapp_number', value: '+9779801234567' },
      { key: 'facebook_url', value: 'https://facebook.com/pascalconsultancy' },
      { key: 'twitter_url', value: 'https://twitter.com/pascaledu' },
      { key: 'instagram_url', value: 'https://instagram.com/pascaleducation' },
      { key: 'linkedin_url', value: 'https://linkedin.com/company/pascaleducation' },
      { key: 'office_hours', value: 'Sun-Fri: 10:00 AM - 6:00 PM' }
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
