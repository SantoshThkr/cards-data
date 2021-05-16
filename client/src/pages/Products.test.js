import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from './Products';
import { getProducts, createProduct } from '../services/api';

jest.mock('../services/api', () => ({
  getProducts: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

const products = [
  { id: '1', name: 'Laptop', category: 'Electronics', price: 900, stock: 12, status: 'Active' },
  { id: '2', name: 'Wireless Keyboard', category: 'Accessories', price: 50, stock: 35, status: 'Active' },
  { id: '3', name: 'Denim Jacket', category: 'Clothing', price: 65, stock: 3, status: 'Low Stock' },
];

beforeEach(() => {
  getProducts.mockResolvedValue(products);
});

test('renders products', async () => {
  render(<Products />);

  expect(screen.getByText('Loading products...')).toBeInTheDocument();
  expect(await screen.findByText('Laptop')).toBeInTheDocument();
  expect(screen.getByText('Wireless Keyboard')).toBeInTheDocument();
  expect(screen.getByText('Denim Jacket')).toBeInTheDocument();
});

test('filters products by search', async () => {
  render(<Products />);
  await screen.findByText('Laptop');

  userEvent.type(screen.getByPlaceholderText('Search products...'), 'lap');

  expect(screen.getByText('Laptop')).toBeInTheDocument();
  expect(screen.queryByText('Wireless Keyboard')).not.toBeInTheDocument();
  expect(screen.queryByText('Denim Jacket')).not.toBeInTheDocument();
});

test('filters products by category', async () => {
  render(<Products />);
  await screen.findByText('Laptop');

  userEvent.selectOptions(screen.getByLabelText('Filter by category'), 'Clothing');

  expect(screen.getByText('Denim Jacket')).toBeInTheDocument();
  expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
});

test('opens the add product form', async () => {
  render(<Products />);
  await screen.findByText('Laptop');

  userEvent.click(screen.getByRole('button', { name: 'Add Product' }));

  expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Category')).toBeInTheDocument();
  expect(screen.getByLabelText('Price')).toBeInTheDocument();
  expect(screen.getByLabelText('Stock')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save Product' })).toBeInTheDocument();
});

test('shows validation errors for empty fields', async () => {
  render(<Products />);
  await screen.findByText('Laptop');

  userEvent.click(screen.getByRole('button', { name: 'Add Product' }));
  userEvent.click(screen.getByRole('button', { name: 'Save Product' }));

  expect(screen.getByText('Product name is required.')).toBeInTheDocument();
  expect(screen.getByText('Category is required.')).toBeInTheDocument();
  expect(screen.getByText('Price is required.')).toBeInTheDocument();
  expect(screen.getByText('Stock is required.')).toBeInTheDocument();
  expect(createProduct).not.toHaveBeenCalled();
});

test('adds a product', async () => {
  createProduct.mockResolvedValue({
    id: '4',
    name: 'Webcam',
    category: 'Electronics',
    price: 45,
    stock: 10,
    status: 'Active',
  });
  render(<Products />);
  await screen.findByText('Laptop');

  userEvent.click(screen.getByRole('button', { name: 'Add Product' }));
  userEvent.type(screen.getByLabelText('Product Name'), 'Webcam');
  userEvent.selectOptions(screen.getByLabelText('Category'), 'Electronics');
  userEvent.type(screen.getByLabelText('Price'), '45');
  userEvent.type(screen.getByLabelText('Stock'), '10');
  userEvent.click(screen.getByRole('button', { name: 'Save Product' }));

  expect(await screen.findByText('Product added successfully.')).toBeInTheDocument();
  expect(screen.getByText('Webcam')).toBeInTheDocument();
  expect(createProduct).toHaveBeenCalledWith({
    name: 'Webcam',
    category: 'Electronics',
    price: 45,
    stock: 10,
    description: '',
  });
});

test('shows an error when products fail to load', async () => {
  getProducts.mockRejectedValue(new Error('Network Error'));
  render(<Products />);

  await waitFor(() =>
    expect(screen.getByText('Unable to load products.')).toBeInTheDocument()
  );
});
