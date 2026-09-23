// Admin auth route group.
// Routes admin login and secure platform access endpoints.
import express from 'express';
import { loginAdmin } from '../../controllers/admin/auth.controller.js';

const router = express.Router();

router.post('/login', loginAdmin);

export default router;
