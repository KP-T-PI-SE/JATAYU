import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  otp: { type: String },
  otpExpiry: { type: Date },
  phone: { type: String },
  status: { type: String, default: 'Active' },
  totalSpent: { type: Number, default: 0, min: 0 },
  ordersCount: { type: Number, default: 0, min: 0 }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
