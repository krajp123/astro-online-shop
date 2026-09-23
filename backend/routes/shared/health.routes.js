// Shared health route group.
// Exposes a lightweight public endpoint for uptime and connectivity verification.
import express from 'express';
import { healthCheck } from '../../controllers/shared/health.controller.js';

const router = express.Router();

router.get('/health', healthCheck);

export default router;
