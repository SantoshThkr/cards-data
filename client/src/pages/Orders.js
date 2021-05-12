import { useEffect, useState } from 'react';
import OrderTable from '../components/OrderTable';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getOrders, updateOrderStatus } from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setOrders(await getOrders());
      } catch (err) {
        setError('Unable to load orders.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (order, status) => {
    setError('');
    setMessage('');

    try {
      const updated = await updateOrderStatus(order.id, status);
      setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
      setMessage(`Order #${updated.orderNumber} marked as ${updated.status}.`);
    } catch (err) {
      setError('Unable to update order.');
    }
  };

  return (
    <div>
      <h1 className="page-title">Orders</h1>

      {message && <p className="success">{message}</p>}
      {error && <ErrorMessage message={error} />}

      <div className="card">
        {loading ? (
          <Loading text="Loading orders..." />
        ) : (
          <OrderTable orders={orders} onStatusChange={handleStatusChange} />
        )}
      </div>
    </div>
  );
}

export default Orders;
