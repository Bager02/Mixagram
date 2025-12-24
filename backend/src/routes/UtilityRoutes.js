import express from 'express';
import { healthCheck, sessionInfo, resetSession } from '../controllers/UtilityControllers.js';

const router = express.Router();

router.get('/health', healthCheck);
router.get('/session', sessionInfo);
router.post('/reset-session', resetSession);

export default router;