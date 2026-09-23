// Customer auth route group.
// Routes customer registration, login, and profile access endpoints.
import express from 'express';
import { loginCustomer, registerCustomer } from '../../controllers/customer/auth.controller.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

export default router;
