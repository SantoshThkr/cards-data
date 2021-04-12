import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { getDashboard } from '../services/api';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(setData);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1 className="page-title">E-Commerce Dashboard</h1>

      <div className="stats">
        <StatCard title="Total Sales" value={`$${data.totalSales.toLocaleString()}`} />
        <StatCard title="Orders" value={data.totalOrders} />
        <StatCard title="Products" value={data.totalProducts} />
        <StatCard title="Customers" value={data.totalCustomers} />
      </div>

      <div className="card">
        <h2 className="card-title">Recent Orders</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.orderNumber}</td>
                  <td>{order.customer}</td>
                  <td>${order.amount}</td>
                  <td>
                    <span className={`badge badge-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
