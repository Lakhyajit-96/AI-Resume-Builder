import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { createSnapshot, listSnapshots, restoreSnapshot } from '../controllers/versionsController.js';

const router = express.Router();

router.post('/create', protect, createSnapshot);
router.get('/list/:resumeId', protect, listSnapshots);
router.post('/restore/:versionId', protect, restoreSnapshot);

export default router;
