import express from 'express';
import authRoutes from './auth.routes.js';
import classesRoutes from '../modules/classes/classesRoutes.js';
import programsRoutes from '../modules/programs/programsRoutes.js';
import enquiriesRoutes from './enquiries.routes.js';
import settingsRoutes from './settings.routes.js';
import contactRoutes from './contact.routes.js';
import partnerRoutes from './partner.routes.js';
import appointmentsRoutes from '../modules/appointments/appointmentRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/classes', classesRoutes);
router.use('/programs', programsRoutes);
router.use('/enquiries', enquiriesRoutes);
router.use('/settings', settingsRoutes);
router.use('/contact', contactRoutes);
router.use('/partner', partnerRoutes);
router.use('/appointments', appointmentsRoutes);

export default router;
