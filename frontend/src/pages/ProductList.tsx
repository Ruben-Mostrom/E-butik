import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:4000/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Fel vid hämtning:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Välkomen till Fiskekroken!</h1>
      <img src="banner.jpg" alt="banner" className="banner" />
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#333' }}>
              <img src={product.image_url} alt={product.name} width="150" />
              <div className="product-info">
                <div className="product-title">
                  <strong>{product.name}</strong> - {product.price} kr
                </div>
                <div className="product-description">
                  <em>{product.description}</em>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
