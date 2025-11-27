import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import upload from '../configs/multer.js';
import { uploadAndExtract } from '../controllers/importsController.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadAndExtract);

export default router;
