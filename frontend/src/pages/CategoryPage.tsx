import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`http://localhost:4000/products`);
      const data = await res.json();

      const filtered = data.filter(
        (product: Product) =>
          product.category && category && product.category.toLowerCase().trim() === category.toLowerCase().trim()
      );
      setProducts(filtered);
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h1>{category}</h1>
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

export default CategoryPage;
