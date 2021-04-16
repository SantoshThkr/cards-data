import { useEffect, useState } from 'react';
import ProductTable from '../components/ProductTable';
import { getProducts } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1 className="page-title">Products</h1>

      <div className="card">
        <ProductTable products={products} />
      </div>
    </div>
  );
}

export default Products;
