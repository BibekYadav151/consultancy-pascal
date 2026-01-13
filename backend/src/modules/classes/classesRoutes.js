import express from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';
import {
  getAllClasses,
  getClassBySlug,
  createClass,
  updateClass,
  deleteClass
} from './classesController.js';

const router = express.Router();

router.get('/', getAllClasses);
router.get('/:slug', getClassBySlug);
router.post('/', authenticateToken, upload.single('image'), createClass);
router.put('/:id', authenticateToken, upload.single('image'), updateClass);
router.delete('/:id', authenticateToken, deleteClass);

export default router;
