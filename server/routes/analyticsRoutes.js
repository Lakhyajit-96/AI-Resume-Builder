import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { track, summary } from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/track', track);
router.get('/summary/:resumeId', protect, summary);

export default router;
