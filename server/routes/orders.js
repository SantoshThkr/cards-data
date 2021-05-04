const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderNumber: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load orders' });
  }
});

// only the status can be changed from the dashboard
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: 'Unable to update order' });
  }
});

module.exports = router;
