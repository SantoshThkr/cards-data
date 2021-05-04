import { useEffect, useState } from 'react';
import OrderTable from '../components/OrderTable';
import { getOrders, updateOrderStatus } from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (order, status) => {
    const updated = await updateOrderStatus(order.id, status);
    setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
    setMessage(`Order #${updated.orderNumber} marked as ${updated.status}.`);
  };

  return (
    <div>
      <h1 className="page-title">Orders</h1>

      {message && <p className="success">{message}</p>}

      <div className="card">
        <OrderTable orders={orders} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}

export default Orders;
