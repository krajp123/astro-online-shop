// Mongoose schema for saved wishlist items in MongoDB.
// Stores products a customer wants to revisit later.
import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    productIds: [{ type: String }]
  },
  { timestamps: true }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
