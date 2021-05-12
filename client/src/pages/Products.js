import { useEffect, useState } from 'react';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api';

const categories = ['Electronics', 'Clothing', 'Accessories'];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProducts(await getProducts());
      } catch (err) {
        setError('Unable to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const openAddForm = () => {
    setEditingProduct(null);
    setShowForm(true);
    setMessage('');
    setError('');
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setMessage('');
    setError('');
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSave = async (formData) => {
    setError('');

    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, formData);
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
        setMessage('Product updated successfully.');
      } else {
        const created = await createProduct(formData);
        setProducts([...products, created]);
        setMessage('Product added successfully.');
      }
      closeForm();
    } catch (err) {
      setError('Unable to save product.');
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setError('');
    setMessage('');

    try {
      await deleteProduct(product.id);
      setProducts(products.filter((p) => p.id !== product.id));
      setMessage('Product deleted successfully.');

      if (editingProduct && editingProduct.id === product.id) {
        closeForm();
      }
    } catch (err) {
      setError('Unable to delete product.');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button className="btn btn-primary" onClick={openAddForm}>
          Add Product
        </button>
      </div>

      {message && <p className="success">{message}</p>}
      {error && <ErrorMessage message={error} />}

      {showForm && (
        <ProductForm
          key={editingProduct ? editingProduct.id : 'new'}
          product={editingProduct}
          categories={categories}
          onSubmit={handleSave}
          onCancel={closeForm}
        />
      )}

      <div className="card">
        <div className="toolbar">
          <input
            type="text"
            className="input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loading text="Loading products..." />
        ) : (
          <ProductTable
            products={filteredProducts}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
