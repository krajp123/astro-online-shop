// Mongoose schema for product catalog data stored in MongoDB.
// This collection holds product listings, variants, media, and catalog metadata.
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: { type: String, default: 'general' },
    brand: { type: String, default: '' },
    images: [{ type: String }],
    tags: [{ type: String }],
    sellerId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    stockStatus: { type: String, default: 'in_stock' }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
