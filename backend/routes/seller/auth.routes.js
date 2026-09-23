// Seller auth route group.
// Routes seller onboarding and dashboard authorization endpoints.
import express from 'express';
import { loginSeller, registerSeller } from '../../controllers/seller/auth.controller.js';

const router = express.Router();

router.post('/register', registerSeller);
router.post('/login', loginSeller);

export default router;
