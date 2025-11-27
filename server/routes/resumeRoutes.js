import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { createResume } from '../controllers/resumeController.js';
import { updateResume, deleteResume, getResumeById, getPublicResumeById } from '../controllers/resumeController.js';
import upload from '../configs/multer.js';// Import the upload middleware

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', upload.single('image'), protect, updateResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;
