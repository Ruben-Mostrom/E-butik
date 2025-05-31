import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/useCart';
import type { Product } from '../types/Product';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:4000/products`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: Product) => p.id === Number(id));
        setProduct(found || null);
      });
  }, [id]);

  if (!product) return <p>Produkten kunde inte hittas.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} width="200" />
      <p>Pris: {product.price} kr</p>
      {product.description && <p>Beskrivning: {product.description}</p>}
      <button onClick={() => addToCart(product)}>Lägg till i kundvagn</button>
    </div>
  );
}
