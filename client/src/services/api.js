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
