import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { createLink, resolveLink, addFeedback, listFeedback } from '../controllers/shareLinksController.js';

const router = express.Router();

router.post('/create', protect, createLink);
router.get('/resolve/:token', resolveLink);
router.post('/feedback/:token', addFeedback);
router.get('/feedback/:token', listFeedback);

export default router;
