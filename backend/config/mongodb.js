// Mongoose MongoDB connection module.
// Serves document-based data for products, reviews, cart, and wishlist collections.
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongo = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectMongo;
