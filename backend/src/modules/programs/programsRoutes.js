import express from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';
import {
  getAllPrograms,
  getProgramBySlug,
  createProgram,
  updateProgram,
  deleteProgram
} from './programsController.js';

const router = express.Router();

router.get('/', getAllPrograms);
router.get('/:slug', getProgramBySlug);
router.post('/', authenticateToken, upload.single('image'), createProgram);
router.put('/:id', authenticateToken, upload.single('image'), updateProgram);
router.delete('/:id', authenticateToken, deleteProgram);

export default router;
