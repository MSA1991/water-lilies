import { create } from 'zustand';
import { createSelectors } from '~/utils/createSelectors';

type OverlayStore = {
  isMenuOpen: boolean;
  isCartOpen: boolean;
  isOrderOpen: boolean;
  toggleMenu: () => void;
  toggleCart: () => void;
  toggleOrder: () => void;
  closeAll: () => void;
};

const overlayStore = create<OverlayStore>((set) => ({
  isMenuOpen: false,
  isCartOpen: false,
  isOrderOpen: false,

  toggleMenu: () =>
    set((state) => ({
      isMenuOpen: !state.isMenuOpen,
      isCartOpen: false,
      isOrderOpen: false,
    })),

  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
      isMenuOpen: false,
      isOrderOpen: false,
    })),

  toggleOrder: () =>
    set((state) => ({
      isOrderOpen: !state.isOrderOpen,
      isMenuOpen: false,
      isCartOpen: false,
    })),

  closeAll: () =>
    set({
      isMenuOpen: false,
      isCartOpen: false,
      isOrderOpen: false,
    }),
}));

export const useOverlay = createSelectors(overlayStore);
