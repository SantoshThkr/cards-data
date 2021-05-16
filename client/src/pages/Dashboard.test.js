import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { getDashboard } from '../services/api';

jest.mock('../services/api', () => ({
  getDashboard: jest.fn(),
}));

const dashboardData = {
  totalSales: 24500,
  totalOrders: 320,
  totalProducts: 128,
  totalCustomers: 540,
  recentOrders: [
    { id: '1', orderNumber: 1001, customer: 'John Doe', amount: 120, status: 'Shipped' },
  ],
};

test('renders statistic cards', async () => {
  getDashboard.mockResolvedValue(dashboardData);
  render(<Dashboard />);

  expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();

  expect(await screen.findByText('$24,500')).toBeInTheDocument();
  expect(screen.getByText('Total Sales')).toBeInTheDocument();
  expect(screen.getByText('320')).toBeInTheDocument();
  expect(screen.getByText('128')).toBeInTheDocument();
  expect(screen.getByText('540')).toBeInTheDocument();
});

test('renders recent orders', async () => {
  getDashboard.mockResolvedValue(dashboardData);
  render(<Dashboard />);

  expect(await screen.findByText('#1001')).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});

test('shows an error when the dashboard fails to load', async () => {
  getDashboard.mockRejectedValue(new Error('Network Error'));
  render(<Dashboard />);

  expect(await screen.findByText('Unable to load dashboard.')).toBeInTheDocument();
});
