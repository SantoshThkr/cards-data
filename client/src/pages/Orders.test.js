import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Orders from './Orders';
import { getOrders, updateOrderStatus } from '../services/api';

jest.mock('../services/api', () => ({
  getOrders: jest.fn(),
  updateOrderStatus: jest.fn(),
}));

const orders = [
  { id: 'a', orderNumber: 1001, customer: 'John Doe', amount: 120, status: 'Shipped', date: '2021-04-15' },
  { id: 'b', orderNumber: 1002, customer: 'Jane Smith', amount: 85, status: 'Pending', date: '2021-04-16' },
];

beforeEach(() => {
  getOrders.mockResolvedValue(orders);
});

test('renders orders', async () => {
  render(<Orders />);

  expect(screen.getByText('Loading orders...')).toBeInTheDocument();
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('#1002')).toBeInTheDocument();
  expect(screen.getByText('$85')).toBeInTheDocument();
});

test('displays the current order status', async () => {
  render(<Orders />);
  await screen.findByText('John Doe');

  expect(screen.getByLabelText('Status for order 1001')).toHaveValue('Shipped');
  expect(screen.getByLabelText('Status for order 1002')).toHaveValue('Pending');
});

test('updates an order status', async () => {
  updateOrderStatus.mockResolvedValue({ ...orders[1], status: 'Processing' });
  render(<Orders />);
  await screen.findByText('John Doe');

  userEvent.selectOptions(screen.getByLabelText('Status for order 1002'), 'Processing');

  expect(await screen.findByText('Order #1002 marked as Processing.')).toBeInTheDocument();
  expect(updateOrderStatus).toHaveBeenCalledWith('b', 'Processing');
  expect(screen.getByLabelText('Status for order 1002')).toHaveValue('Processing');
});
