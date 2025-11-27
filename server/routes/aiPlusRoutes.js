import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { scoreResumeVsJob, metricizeBullets, generateCoverLetter, translateResume, projectCards, normalizeTone, a11yCheck } from '../controllers/aiPlusController.js';

const router = express.Router();

router.post('/score', protect, scoreResumeVsJob);
router.post('/metricize', protect, metricizeBullets);
router.post('/cover-letter', protect, generateCoverLetter);
router.post('/translate', protect, translateResume);
router.post('/project-cards', protect, projectCards);
router.post('/tone', protect, normalizeTone);
router.post('/a11y-check', protect, a11yCheck);

export default router;
