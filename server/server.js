const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce-admin';

const app = express();

app.use(express.json());

app.use('/api/products', require('./routes/products'));
app.use('/api/dashboard', require('./routes/dashboard'));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
