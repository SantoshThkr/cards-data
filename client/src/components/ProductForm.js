import { useState } from 'react';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
};

function ProductForm({ product, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          category: product.category,
          price: String(product.price),
          stock: String(product.stock),
          description: product.description || '',
        }
      : emptyForm
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form className="card product-form" onSubmit={handleSubmit}>
      <h2 className="card-title">{product ? 'Edit Product' : 'Add Product'}</h2>

      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          className="input"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="input"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="input"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            className="input"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          className="input"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Product
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
