// Express application setup for the shared backend.
// This file configures middleware, CORS, and route registration for all frontend apps.
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongo from './config/mongodb.js';
import healthRoutes from './routes/shared/health.routes.js';
import customerAuthRoutes from './routes/customer/auth.routes.js';
import sellerAuthRoutes from './routes/seller/auth.routes.js';
import adminAuthRoutes from './routes/admin/auth.routes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175'
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', healthRoutes);
app.use('/api/customer/auth', customerAuthRoutes);
app.use('/api/seller/auth', sellerAuthRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce backend API is running' });
});

connectMongo();

export default app;
