import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ShoeSize } from '../types';

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: ShoeSize) => void;
  removeItem: (productId: string, size: ShoeSize) => void;
  updateQuantity: (productId: string, size: ShoeSize, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  grandTotal: () => number;
};

const itemKey = (productId: string, size: ShoeSize) => `${productId}:${size}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addItem: (product, size) =>
        set((state) => {
          const nextItems = [...state.items];
          const existing = nextItems.find((item) => itemKey(item.productId, item.size) === itemKey(product.id, size));

          if (existing) {
            existing.quantity += 1;
          } else {
            nextItems.push({
              productId: product.id,
              name: product.name,
              brand: product.brand,
              size,
              price: product.price,
              image: product.images[0],
              quantity: 1,
            });
          }

          return { items: nextItems, isCartOpen: true };
        }),
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.filter((item) => itemKey(item.productId, item.size) !== itemKey(productId, size)),
        })),
      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              itemKey(item.productId, item.size) === itemKey(productId, size)
                ? { ...item, quantity: Math.max(0, quantity) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      grandTotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'axecure-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
