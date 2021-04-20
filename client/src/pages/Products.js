import { useEffect, useState } from 'react';
import ProductTable from '../components/ProductTable';
import { getProducts } from '../services/api';

const categories = ['Electronics', 'Clothing', 'Accessories'];

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1 className="page-title">Products</h1>

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

        <ProductTable products={filteredProducts} />
      </div>
    </div>
  );
}

export default Products;
