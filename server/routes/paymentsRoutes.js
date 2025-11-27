import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { getConfig, verifySubscription, webhook, bootstrapPlans, getEntitlement } from '../controllers/paymentsController.js';

const router = express.Router();

router.get('/config', getConfig);
router.post('/verify-subscription', protect, verifySubscription);
router.post('/webhook', webhook);
router.post('/bootstrap-plans', protect, bootstrapPlans);
router.get('/entitlement', protect, getEntitlement);

export default router;
