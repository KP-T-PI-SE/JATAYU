import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ['percent', 'fixed'], required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Expired'], default: 'Active' },
  usageCount: { type: Number, default: 0, min: 0 },
  expiryDate: { type: Date }
}, {
  timestamps: true
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
export default PromoCode;
