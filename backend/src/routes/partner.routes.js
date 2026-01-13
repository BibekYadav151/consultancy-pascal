import express from 'express';
import { PartnerController } from '../modules/partner/partner.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getDashboardStats } from '../modules/partner/dashboardController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const partnerController = new PartnerController();

// Dashboard stats
router.get('/dashboard/stats', authenticateToken, getDashboardStats);

// Get all partners
router.get('/', asyncHandler((req, res) => partnerController.getAll(req, res)));

// Get partner by ID
router.get('/:id', asyncHandler((req, res) => partnerController.getById(req, res)));

// Create new partner
router.post('/', asyncHandler((req, res) => partnerController.create(req, res)));

// Update partner
router.put('/:id', asyncHandler((req, res) => partnerController.update(req, res)));

// Delete partner
router.delete('/:id', asyncHandler((req, res) => partnerController.delete(req, res)));

export default router;

