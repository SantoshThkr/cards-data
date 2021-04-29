function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="empty">No products found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <span
                  className={`badge badge-${product.status
                    .toLowerCase()
                    .replace(/ /g, '-')}`}
                >
                  {product.status}
                </span>
              </td>
              <td>
                <button className="btn btn-small" onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
