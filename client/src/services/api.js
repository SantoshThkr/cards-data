import axios from 'axios';

// requests are proxied to the express server in development (see package.json)
const API_URL = '/api';

export const getDashboard = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/products/${id}`);
};

export const getOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/orders/${id}`, { status });
  return response.data;
};

export const getCustomers = async () => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};
