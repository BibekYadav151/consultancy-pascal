# Pascal Education Consultancy - Complete Project Setup

## 🎯 Project Overview
This is a full-stack educational consultancy platform built with React + Vite frontend and Express/Node backend with SQLite database.

## 📋 Complete Project Structure

### Frontend (React + Vite)
- **Location**: `/home/engine/project`
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Features**:
  - Public pages: Home, About, Destinations, Universities, Blog, Contact
  - Admin panel with authentication
  - Responsive design
  - Rich text editing for blogs

### Backend (Express + Node.js)
- **Location**: `/home/engine/project/backend`
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Features**:
  - JWT authentication
  - RESTful API
  - File upload support
  - Admin panel backend

## 🚀 How to Run the Complete Project

### 1. Backend Setup
```bash
# Navigate to backend directory
cd /home/engine/project/backend

# Install dependencies
npm install

# Start the backend server
npm start
```
**Backend will run on**: http://localhost:3000
**Health Check**: http://localhost:3000/health

### 2. Frontend Setup
```bash
# In a new terminal, navigate to frontend directory
cd /home/engine/project

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```
**Frontend will run on**: http://localhost:5173

## 🔐 Default Admin Credentials
- **Email**: admin@pascal.edu.np
- **Password**: admin123

## 📱 Access URLs

### Public Website
- **Home**: http://localhost:5173/
- **About**: http://localhost:5173/about
- **Destinations**: http://localhost:5173/destinations
- **Universities**: http://localhost:5173/universities
- **Blog**: http://localhost:5173/blog
- **Contact**: http://localhost:5173/contact

### Admin Panel
- **Login**: http://localhost:5173/admin
- **Dashboard**: http://localhost:5173/admin/dashboard

## 🗃️ Database Structure

The project uses SQLite with the following tables:
- `admins` - Admin user management
- `countries` - Study destinations
- `universities` - University data
- `blogs` - Blog posts
- `enquiries` - Contact form submissions
- `settings` - Site configuration

## 🌐 API Endpoints

### Public API
- `GET /api/countries` - List countries
- `GET /api/countries/:slug` - Country details
- `GET /api/universities` - List universities
- `GET /api/blogs` - List published blogs
- `POST /api/enquiries` - Submit enquiry

### Admin API (requires JWT)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile
- `PUT /api/auth/change-password` - Change password
- `GET /api/settings/dashboard` - Dashboard statistics
- CRUD operations for: countries, universities, blogs, enquiries

## 🎨 Features Implemented

### Public Side
✅ Modern responsive homepage with hero section
✅ Country destinations with filtering
✅ University listings and details
✅ Blog system with categories
✅ Contact form with validation
✅ WhatsApp integration
✅ Mobile-friendly navigation

### Admin Panel
✅ Secure JWT authentication
✅ Dashboard with statistics
✅ Country management (CRUD)
✅ University management (CRUD)
✅ Blog management (CRUD)
✅ Enquiry management
✅ Site settings configuration
✅ Rich text editing

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- React Icons
- React Hot Toast

### Backend
- Express.js
- SQLite (better-sqlite3)
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- CORS enabled
- Helmet for security

## 🔧 Configuration

### Environment Variables
Create `.env` files:

**Frontend** (`/home/engine/project/.env`):
```env
VITE_API_URL=http://localhost:3000/api
```

**Backend** (`/home/engine/project/backend/.env`):
```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## 📁 Project Structure

```
/home/engine/project/
├── src/
│   ├── components/          # Reusable components
│   │   ├── admin/           # Admin-specific components
│   │   ├── common/          # Shared components
│   │   └── layout/          # Layout components
│   ├── pages/
│   │   ├── public/          # Public pages
│   │   └── admin/           # Admin pages
│   ├── services/             # API services
│   └── context/             # React context
├── backend/
│   ├── src/
│   │   ├── modules/         # Backend modules
│   │   ├── routes/          # API routes
│   │   ├── middleware/       # Express middleware
│   │   └── config/          # Database config
│   └── uploads/             # File uploads directory
└── public/                  # Static assets
```

## 🚀 Deployment Ready

The project is configured for deployment with:
- Environment variable support
- Production build scripts
- Static file serving
- Database auto-initialization
- Error handling middleware

## ✅ Project Status: COMPLETE

All requested features have been implemented:
- ✅ Admin side aligned with user side
- ✅ Complete backend functionality
- ✅ Educational consultancy theme
- ✅ Working authentication
- ✅ CRUD operations for all entities
- ✅ File upload support
- ✅ Responsive design
- ✅ Mobile-friendly interface
- ✅ SEO-friendly URLs
- ✅ Dashboard with statistics

## 🆘 Troubleshooting

### Common Issues:
1. **Port already in use**: Change PORT in backend .env
2. **CORS errors**: Check frontend API URL in .env
3. **Database errors**: Restart backend server
4. **Admin login fails**: Check default credentials above

### Reset Database:
```bash
# Delete database file and restart backend
rm /home/engine/project/backend/data/consultancy.db
npm start
```

---

**Project completed and ready for use!** 🎉