import type { Product } from '../types/Product';
import { useCart } from '../context/useCart';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} width="200" />
      <h2>{product.name}</h2>
      <p>{product.price} kr</p>
      <button onClick={() => addToCart(product)}>Lägg till i kundvagn</button>
    </div>
  );
};
