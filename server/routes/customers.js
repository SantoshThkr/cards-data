const express = require('express');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load customers' });
  }
});

module.exports = router;
