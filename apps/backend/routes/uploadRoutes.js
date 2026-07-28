import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { protect, admin } from '../middleware/authMiddleware.js';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'jatayu/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// POST /api/upload
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(201).json({
      url: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image: ' + error.message });
  }
});

// DELETE /api/upload
router.delete('/', protect, admin, async (req, res) => {
  const { publicId } = req.body;
  
  if (!publicId) {
    return res.status(400).json({ message: 'No publicId provided' });
  }
  
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === 'ok' || result.result === 'not found') {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete image from Cloudinary', result });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image: ' + error.message });
  }
});

export default router;
