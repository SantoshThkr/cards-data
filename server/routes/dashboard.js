const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [totalProducts, totalCustomers, orders] = await Promise.all([
      Product.countDocuments(),
      Customer.countDocuments(),
      Order.find().sort({ orderNumber: -1 }),
    ]);

    // cancelled orders don't count towards sales
    const totalSales = orders
      .filter((order) => order.status !== 'Cancelled')
      .reduce((sum, order) => sum + order.amount, 0);

    res.json({
      totalSales,
      totalOrders: orders.length,
      totalProducts,
      totalCustomers,
      recentOrders: orders.slice(0, 5),
    });
  } catch (err) {
    res.status(500).json({ message: 'Unable to load dashboard data' });
  }
});

module.exports = router;
