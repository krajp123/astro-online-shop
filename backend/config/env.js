// Environment loader for shared backend configuration.
// Handles all runtime variables used by Express, Prisma, MongoDB, JWT, and external services.
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 5000),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ecommerce_db',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
  JWT_SECRET: process.env.JWT_SECRET || 'change-me',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'change-me-refresh',
  CLIENT_ORIGINS: {
    customer: process.env.CUSTOMER_APP_URL || 'http://localhost:5173',
    seller: process.env.SELLER_APP_URL || 'http://localhost:5174',
    admin: process.env.ADMIN_APP_URL || 'http://localhost:5175'
  }
};
