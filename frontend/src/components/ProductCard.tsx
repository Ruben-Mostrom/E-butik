import type { Product } from '../types/Product';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} width="200" />
      <h2>{product.name}</h2>
      <p>{product.price} kr</p>
    </div>
  );
};
