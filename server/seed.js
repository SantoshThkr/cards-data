const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Customer = require('./models/Customer');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce-admin';

const products = [
  { name: 'Laptop', category: 'Electronics', price: 900, stock: 12, description: '15 inch laptop with 16GB RAM' },
  { name: 'Wireless Keyboard', category: 'Accessories', price: 50, stock: 35, description: 'Wireless keyboard for everyday use' },
  { name: 'Wireless Mouse', category: 'Accessories', price: 25, stock: 4, description: 'Compact mouse with USB receiver' },
  { name: 'Bluetooth Headphones', category: 'Electronics', price: 120, stock: 18, description: 'Over-ear headphones with noise cancelling' },
  { name: '27" Monitor', category: 'Electronics', price: 280, stock: 7, description: '27 inch IPS monitor' },
  { name: 'Cotton T-Shirt', category: 'Clothing', price: 15, stock: 80, description: 'Plain cotton t-shirt' },
  { name: 'Denim Jacket', category: 'Clothing', price: 65, stock: 3, description: 'Classic blue denim jacket' },
  { name: 'Running Shoes', category: 'Clothing', price: 90, stock: 0, description: 'Lightweight running shoes' },
  { name: 'Laptop Bag', category: 'Accessories', price: 40, stock: 22, description: 'Padded bag for 15 inch laptops' },
  { name: 'USB-C Charger', category: 'Accessories', price: 30, stock: 50, description: '65W USB-C wall charger' },
];

const customers = [
  { name: 'John Doe', email: 'john@example.com', orders: 5, joined: '2021-01-12' },
  { name: 'Jane Smith', email: 'jane@example.com', orders: 3, joined: '2021-02-03' },
  { name: 'Mike Jones', email: 'mike@example.com', orders: 8, joined: '2021-02-18' },
  { name: 'Sarah Lee', email: 'sarah@example.com', orders: 2, joined: '2021-03-05' },
  { name: 'David Brown', email: 'david@example.com', orders: 4, joined: '2021-03-20' },
  { name: 'Emily Clark', email: 'emily@example.com', orders: 1, joined: '2021-04-02' },
];

const orders = [
  { orderNumber: 1001, customer: 'John Doe', amount: 120, status: 'Shipped', date: '2021-04-15' },
  { orderNumber: 1002, customer: 'Jane Smith', amount: 85, status: 'Pending', date: '2021-04-16' },
  { orderNumber: 1003, customer: 'Mike Jones', amount: 210, status: 'Delivered', date: '2021-04-16' },
  { orderNumber: 1004, customer: 'Sarah Lee', amount: 950, status: 'Processing', date: '2021-04-17' },
  { orderNumber: 1005, customer: 'David Brown', amount: 45, status: 'Cancelled', date: '2021-04-18' },
  { orderNumber: 1006, customer: 'John Doe', amount: 330, status: 'Delivered', date: '2021-04-19' },
  { orderNumber: 1007, customer: 'Emily Clark', amount: 65, status: 'Pending', date: '2021-04-20' },
  { orderNumber: 1008, customer: 'Mike Jones', amount: 180, status: 'Shipped', date: '2021-04-21' },
];

const seed = async () => {
  await mongoose.connect(MONGO_URI);

  await Promise.all([
    Product.deleteMany(),
    Order.deleteMany(),
    Customer.deleteMany(),
  ]);

  // create() runs the save hook that sets each product's status
  await Product.create(products);
  await Customer.insertMany(customers);
  await Order.insertMany(orders);

  console.log('Database seeded');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
