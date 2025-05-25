import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error('Fel vid hämtning:', err));
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
