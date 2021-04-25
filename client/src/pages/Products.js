import { useEffect, useState } from 'react';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import { getProducts, createProduct, updateProduct } from '../services/api';

const categories = ['Electronics', 'Clothing', 'Accessories'];

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const openAddForm = () => {
    setEditingProduct(null);
    setShowForm(true);
    setMessage('');
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setMessage('');
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSave = async (formData) => {
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

        <ProductTable products={filteredProducts} onEdit={openEditForm} />
      </div>
    </div>
  );
}

export default Products;
