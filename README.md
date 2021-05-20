# E-Commerce Admin Dashboard

A small admin dashboard for managing products, orders and customers.

## Features

- Dashboard statistics (total sales, orders, products, customers) and recent orders
- Product management: add, edit and delete products
- Product search by name
- Product filtering by category
- Stock status (Active, Low Stock, Out of Stock) set automatically from stock level
- Order list with status updates (Pending, Processing, Shipped, Delivered, Cancelled)
- Customer list
- Loading and error messages
- Product form validation
- Responsive layout for desktop, tablet and mobile

## Tech Stack

Frontend:
- React
- JavaScript
- Axios
- React Router
- CSS

Backend:
- Node.js
- Express
- MongoDB
- Mongoose

Testing:
- Jest
- React Testing Library

## Installation

You need Node.js and a running MongoDB instance.

Install the server and client dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Load some sample data (this clears the existing products, orders and customers):

```bash
cd server
npm run seed
```

The server connects to `mongodb://127.0.0.1:27017/ecommerce-admin` by default.
Set `MONGO_URI` to use a different database and `PORT` to change the API port (default `5001`).

## Run

Start the API:

```bash
cd server
npm start
```

Start the React app in a second terminal:

```bash
cd client
npm start
```

The app runs on http://localhost:3000. API requests are proxied to
http://localhost:5001 (see `proxy` in `client/package.json`).

Run the tests:

```bash
cd client
npm test
```

## API

All endpoints are under `/api`.

| Method | Endpoint             | Description                                   |
| ------ | -------------------- | --------------------------------------------- |
| GET    | `/api/dashboard`     | Totals and the 5 most recent orders           |
| GET    | `/api/products`      | List products                                 |
| POST   | `/api/products`      | Create a product                              |
| PUT    | `/api/products/:id`  | Update a product                              |
| DELETE | `/api/products/:id`  | Delete a product                              |
| GET    | `/api/orders`        | List orders, newest first                     |
| PUT    | `/api/orders/:id`    | Update an order's status                      |
| GET    | `/api/customers`     | List customers                                |

Product body:

```json
{
  "name": "Wireless Keyboard",
  "category": "Accessories",
  "price": 50,
  "stock": 35,
  "description": "Wireless keyboard for everyday use"
}
```

`status` is not sent by the client. The server sets it when a product is saved:
0 in stock is `Out of Stock`, less than 5 is `Low Stock`, otherwise `Active`.

Total sales on the dashboard is the sum of all orders that are not cancelled.

## Project Structure

```text
client/                 React app (Create React App)
  src/
    components/         Sidebar, StatCard, tables, ProductForm, Loading, ErrorMessage
    pages/              Dashboard, Products, Orders, Customers (+ tests)
    services/api.js     All Axios calls to the API
    styles/App.css      App styles and media queries
    App.js              Layout and routes

server/                 Express API
  models/               Mongoose models for Product, Order and Customer
  routes/               One router per resource
  seed.js               Sample data
  server.js             App setup and MongoDB connection
```
