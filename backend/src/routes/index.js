import express from 'express';
import authRoutes from './auth.routes.js';
import countriesRoutes from './countries.routes.js';
import universitiesRoutes from './universities.routes.js';
import blogsRoutes from './blogs.routes.js';
import enquiriesRoutes from './enquiries.routes.js';
import settingsRoutes from './settings.routes.js';
import contactRoutes from './contact.routes.js';
import partnerRoutes from './partner.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/countries', countriesRoutes);
router.use('/universities', universitiesRoutes);
router.use('/blogs', blogsRoutes);
router.use('/enquiries', enquiriesRoutes);
router.use('/settings', settingsRoutes);
router.use('/contact', contactRoutes);
router.use('/partner', partnerRoutes);

export default router;
