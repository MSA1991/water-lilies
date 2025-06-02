import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from '~/utils/createSelectors';
import { CartProduct } from '~/types/Product';

type CartStore = {
  products: CartProduct[];
  clearCart: () => void;
  addProduct: (product: CartProduct) => void;
  removeProduct: (title: string) => void;
  increaseQuantity: (title: string) => void;
  decreaseQuantity: (title: string) => void;
};

const PRODUCT_ORDER_LIMIT = 5;

const cartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [],
      clearCart: () => set({ products: [] }),

      addProduct: (product) =>
        set((state) => ({
          products: state.products.find(
            ({ title, variant: { size } }) =>
              title === product.title && size === product.variant.size,
          )
            ? state.products
            : [...state.products, product],
        })),

      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter(({ id }) => id !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId && product.quantity < PRODUCT_ORDER_LIMIT
              ? { ...product, quantity: product.quantity + 1 }
              : product,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId && product.quantity > 1
              ? { ...product, quantity: product.quantity - 1 }
              : product,
          ),
        })),
    }),
    {
      name: 'cart',
      partialize: (state) => ({ products: state.products }),
    },
  ),
);

export const useCart = createSelectors(cartStore);
