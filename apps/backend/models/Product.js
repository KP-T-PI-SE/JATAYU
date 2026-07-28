import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  }],
  image: { type: String }, // Backward compatibility
  category: { type: String, required: true }, // Men, Women, etc.
  stock: { type: Number, required: true, default: 0, min: 0 },
  status: { type: String, required: true, default: 'Active' },
  sales: { type: Number, default: 0, min: 0 },
  isNewArrival: { type: Boolean, default: false },
  description: { type: String, default: '' },
  colors: [{ type: String }],
  sizes: [{ type: String }],
  badges: [{ type: String }],
  materials: [{ type: String }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
