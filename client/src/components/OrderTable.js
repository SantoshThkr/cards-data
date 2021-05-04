const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function OrderTable({ orders, onStatusChange }) {
  if (orders.length === 0) {
    return <p className="empty">No orders found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.orderNumber}</td>
              <td>{order.customer}</td>
              <td>${order.amount}</td>
              <td>{order.date}</td>
              <td>
                <select
                  className={`status-select badge-${order.status.toLowerCase()}`}
                  value={order.status}
                  onChange={(e) => onStatusChange(order, e.target.value)}
                  aria-label={`Status for order ${order.orderNumber}`}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
