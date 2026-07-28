import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Initialize Razorpay
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
  });
};

// GET all orders (Admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET my orders (Customer)
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create razorpay order
router.post('/create-razorpay-order', protect, async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let calculatedTotal = 0;
    const validatedItems = [];

    // Server-side price validation and stock check
    for (const item of items) {
      const product = await Product.findById(item.id || item._id || item.product);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.name}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      
      const itemPrice = product.discount > 0 ? (product.price - (product.price * product.discount) / 100) : product.price;
      calculatedTotal += itemPrice * item.quantity;
      
      validatedItems.push({
        product: product._id,
        name: product.name,
        qty: item.quantity,
        image: item.image,
        price: itemPrice,
        size: item.size,
        color: item.color
      });
    }

    const rzp = getRazorpayInstance();
    const options = {
      amount: Math.round(calculatedTotal * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await rzp.orders.create(options);
    
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      validatedItems,
      calculatedTotal
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ message: 'Error creating payment order', error: error.message });
  }
});

// POST verify payment and create DB order
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, total, customerName, address } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Check for duplicate payment
    const existingOrder = await Order.findOne({ paymentId: razorpay_payment_id });
    if (existingOrder) {
      return res.status(400).json({ message: 'Order for this payment already exists' });
    }

    // Double check stock and deduct
    for (const item of items) {
       const product = await Product.findById(item.product);
       if (product && product.stock >= item.qty) {
         product.stock -= item.qty;
         await product.save();
       } else {
         // In a real production app we would refund here or partial refund if out of stock during payment.
       }
    }

    const order = new Order({
      user: req.user._id,
      customerName,
      address,
      items,
      total,
      paymentId: razorpay_payment_id,
      paymentStatus: 'Paid',
      status: 'Placed'
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: error.message });
  }
});

// PUT update order status (Admin)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
