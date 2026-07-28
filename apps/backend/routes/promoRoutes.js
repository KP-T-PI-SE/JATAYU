import express from 'express';
import PromoCode from '../models/PromoCode.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const promos = await PromoCode.find({});
    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const promo = await PromoCode.create(req.body);
    res.status(201).json(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const promo = await PromoCode.findById(req.params.id);
    if (promo) {
      await promo.deleteOne();
      res.json({ message: 'Promo removed' });
    } else {
      res.status(404).json({ message: 'Promo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
