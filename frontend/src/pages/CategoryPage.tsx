import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import type { Category } from '../types/Category';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [matchedCategory, setMatchedCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [productRes, categoryRes] = await Promise.all([
          fetch('http://localhost:4000/products'),
          fetch('http://localhost:4000/categories')
        ]);

        if (!productRes.ok || !categoryRes.ok) {
          throw new Error('Kunde inte hämta data från servern');
        }

        const [productData, categoryData] = await Promise.all([productRes.json(), categoryRes.json()]);

        const match = categoryData.find(
          (cat: Category) => cat.name.toLowerCase().trim() === category?.toLowerCase().trim()
        );

        setMatchedCategory(match || null);

        if (!match) {
          setProducts([]);
          return;
        }

        const filtered = productData.filter((product: Product) => product.category_id === match.id);

        setProducts(filtered);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (isLoading) return <div>Laddar produkter...</div>;
  if (error) return <div style={{ color: 'red' }}>Fel: {error}</div>;

  return (
    <div>
      <h1>{matchedCategory?.name || 'Kategori'}</h1>

      {products.length === 0 ? (
        <p>Inga produkter hittades i denna kategori.</p>
      ) : (
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
      )}
    </div>
  );
};

export default CategoryPage;
