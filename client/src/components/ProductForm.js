import { useState } from 'react';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
};

const validate = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Product name is required.';
  }

  if (!form.category) {
    errors.category = 'Category is required.';
  }

  if (form.price === '') {
    errors.price = 'Price is required.';
  } else if (isNaN(form.price) || Number(form.price) < 0) {
    errors.price = 'Price must be a valid number.';
  }

  if (form.stock === '') {
    errors.stock = 'Stock is required.';
  } else if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
    errors.stock = 'Stock must be a whole number.';
  }

  return errors;
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate(form);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form className="card product-form" onSubmit={handleSubmit} noValidate>
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
        {errors.name && <span className="field-error">{errors.name}</span>}
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
        {errors.category && (
          <span className="field-error">{errors.category}</span>
        )}
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
          {errors.price && <span className="field-error">{errors.price}</span>}
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
          {errors.stock && <span className="field-error">{errors.stock}</span>}
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
