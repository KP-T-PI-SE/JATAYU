import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Helper to create a specific transporter
const createTransporter = (user, pass) => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    requireTLS: true, // often required for Office 365 / GoDaddy
    auth: {
      user: user || process.env.SMTP_USER || 'ethereal.user@ethereal.email',
      pass: pass || process.env.SMTP_PASS || 'ethereal.pass',
    },
  });
};

export const sendEmail = async (to, subject, html, type = 'default') => {
  try {
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASS;
    let from = process.env.SMTP_FROM || user;

    if (type === 'auth' && process.env.SMTP_AUTH_USER) {
      user = process.env.SMTP_AUTH_USER;
      pass = process.env.SMTP_AUTH_PASS;
      from = `"Jatayu Auth" <${user}>`;
    } else if (type === 'sales' && process.env.SMTP_SALES_USER) {
      user = process.env.SMTP_SALES_USER;
      pass = process.env.SMTP_SALES_PASS;
      from = `"Jatayu Sales" <${user}>`;
    } else if (type === 'marketing' && process.env.SMTP_MKT_USER) {
      user = process.env.SMTP_MKT_USER;
      pass = process.env.SMTP_MKT_PASS;
      from = `"Jatayu Marketing" <${user}>`;
    } else {
      from = `"Jatayu Store" <${from || 'noreply@jatayu.com'}>`;
    }

    const transporter = createTransporter(user, pass);

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log(`[${type}] Email sent: %s`, info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendOTP = async (email, otp) => {
  const subject = 'Your Jatayu Verification Code';
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Welcome to Jatayu!</h2>
      <p>Your verification code is:</p>
      <h1 style="font-size: 32px; letter-spacing: 5px; color: #1a1a1a;">${otp}</h1>
      <p>This code will expire in 10 minutes. Do not share this code with anyone.</p>
      <p>Stay raw,<br>The Jatayu Team</p>
    </div>
  `;
  return await sendEmail(email, subject, html, 'auth');
};

export const sendOrderInvoice = async (email, orderDetails) => {
  const subject = `Order Confirmation - Jatayu #${orderDetails.orderId || 'Order'}`;
  
  // Format items nicely
  const itemsHtml = (orderDetails.items || []).map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} (${item.size || ''} / ${item.color || ''})</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">Qty: ${item.qty || 1}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${item.price}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Thank you for your order!</h2>
      <p>Hi ${orderDetails.customerName || 'there'},</p>
      <p>We've received your order and are getting it ready for shipment.</p>
      
      <h3>Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${itemsHtml}
      </table>
      <h3 style="text-align: right;">Total: ₹${orderDetails.total}</h3>
      
      <h3>Shipping Address</h3>
      <p>${orderDetails.address?.street}, ${orderDetails.address?.city}, ${orderDetails.address?.state} - ${orderDetails.address?.pinCode}</p>
      
      <p>We'll notify you once it ships!</p>
      <p>Stay raw,<br>The Jatayu Team</p>
    </div>
  `;
  return await sendEmail(email, subject, html, 'sales');
};

export const sendAdminOrderNotification = async (adminEmail, orderDetails) => {
  const subject = `NEW ORDER RECEIVED - ₹${orderDetails.total}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>New Order Alert!</h2>
      <p><strong>Customer:</strong> ${orderDetails.customerName} (${orderDetails.userEmail})</p>
      <p><strong>Total Value:</strong> ₹${orderDetails.total}</p>
      <p><strong>Payment Status:</strong> Paid</p>
      <p>Please check the admin dashboard for full details to process this order.</p>
    </div>
  `;
  return await sendEmail(adminEmail, subject, html, 'sales');
};
