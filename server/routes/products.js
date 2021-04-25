const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load products' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;
    const product = await Product.create({
      name,
      category,
      price,
      stock,
      description,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Unable to save product' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, category, price, stock, description } = req.body;
    product.set({ name, category, price, stock, description });

    // save() instead of findByIdAndUpdate so the status hook runs
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Unable to save product' });
  }
});

module.exports = router;
