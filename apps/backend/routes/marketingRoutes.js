import express from 'express';
import { sendEmail } from '../utils/emailService.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// POST subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Send a welcome to newsletter email
    const subject = 'Welcome to the Jatayu Community';
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Welcome to the Journey!</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll be the first to know about new drops, exclusive collections, and behind-the-scenes stories.</p>
        <p>Stay raw,<br>The Jatayu Team</p>
      </div>
    `;
    
    await sendEmail(email, subject, html, 'marketing');
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST blast marketing email (Admin only)
router.post('/blast', protect, admin, async (req, res) => {
  try {
    const { subject, htmlContent } = req.body;
    if (!subject || !htmlContent) {
      return res.status(400).json({ message: 'Subject and HTML content are required' });
    }

    // Get all users who opted in (for now we send to all active users)
    const users = await User.find({ status: 'Active' }).select('email');
    let successCount = 0;

    for (const user of users) {
      const sent = await sendEmail(user.email, subject, htmlContent, 'marketing');
      if (sent) successCount++;
    }

    res.json({ message: `Marketing email sent to ${successCount} users` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
