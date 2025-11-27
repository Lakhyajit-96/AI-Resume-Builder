import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import aiPlusRouter from './routes/aiPlusRoutes.js';
import paymentsRouter from './routes/paymentsRoutes.js';
import analyticsRouter from './routes/analyticsRoutes.js';
import shareLinksRouter from './routes/shareLinksRoutes.js';
import versionsRouter from './routes/versionsRoutes.js';
import importsRouter from './routes/importsRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const BODY_LIMIT = process.env.BODY_LIMIT || '10mb';

// Database connection
try {
    await connectDB();
} catch (err) {
    console.error('Database connection failed. Server will continue running without DB:', err.message || err);
}

app.use(express.json({ limit: BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: BODY_LIMIT }));
app.use(cors());

app.get('/', (req, res)=> res.send("Server is live..."))
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);
app.use('/api/ai-plus', aiPlusRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/share-links', shareLinksRouter);
app.use('/api/versions', versionsRouter);
app.use('/api/imports', importsRouter);
app.use('/api/jobs', jobsRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});