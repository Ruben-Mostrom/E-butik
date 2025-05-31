import { createContext } from 'react';
import type { Product } from '../types/Product';

export type CartItem = Product & { quantity: number };

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
