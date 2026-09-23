// Mongoose schema for product reviews stored in MongoDB.
// Handles ratings and review content submitted by customers.
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, default: '' },
    comment: { type: String, default: '' },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
