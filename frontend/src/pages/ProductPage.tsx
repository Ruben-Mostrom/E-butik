import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string | null;
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

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
      <p>Pris: {product.price} kr</p>
      {product.description && <p>Beskrivning: {product.description}</p>}
    </div>
  );
}
