import express from 'express';
import { fetchJob } from '../controllers/jobsController.js';

const router = express.Router();

router.post('/fetch', fetchJob);

export default router;
