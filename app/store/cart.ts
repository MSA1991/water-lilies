import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from '~/utils/createSelectors';
import { CartProduct } from '~/types/Product';

type CartStore = {
  isOpen: boolean;
  toggleIsOpen: () => void;
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (title: string) => void;
  increaseQuantity: (title: string) => void;
  decreaseQuantity: (title: string) => void;
};

const cartStore = create<CartStore>()(
  persist(
    (set) => ({
      isOpen: false,
      toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),

      products: [],

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
            product.id === productId && product.quantity < 5
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
