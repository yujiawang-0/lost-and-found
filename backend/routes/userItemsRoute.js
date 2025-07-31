import express from 'express';
import Item from '../models/item.model.js';

const router = express.Router();

router.get('/user', async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    const items = await Item.find({ email }); // assumes each item has an `email` field
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}); // GET /api/items/user?email=user@email.com

export default router;