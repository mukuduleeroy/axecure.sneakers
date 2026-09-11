export type ShoeSize = `EU ${number}` | `US ${number}`;

export type ProductCategory = 'High-tops' | 'Running' | 'Retro' | 'Lifestyle' | 'Basketball';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  sizes: ShoeSize[];
  stock: number;
  images: string[];
};

export type CartItem = {
  productId: string;
  name: string;
  brand: string;
  size: ShoeSize;
  price: number;
  image: string;
  quantity: number;
};

export type CustomerDetails = {
  fullName: string;
  phone: string;
  delivery: string;
};
