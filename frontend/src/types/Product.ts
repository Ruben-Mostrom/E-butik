export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
