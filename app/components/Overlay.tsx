import { lazy, Suspense, useCallback, useEffect } from 'react';
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';

import { PageLoader } from './UI/PageLoader';

import { useOverlay } from '~/store/overlay';

const Menu = lazy(() =>
  import('./Menu').then((module) => ({ default: module.Menu })),
);
const Cart = lazy(() =>
  import('./Cart').then((module) => ({ default: module.Cart })),
);
const OrderModal = lazy(() =>
  import('./OrderModal').then((module) => ({ default: module.OrderModal })),
);

export const Overlay = () => {
  const isCartOpen = useOverlay.use.isCartOpen();
  const isMenuOpen = useOverlay.use.isMenuOpen();
  const isOrderOpen = useOverlay.use.isOrderOpen();
  const closeAll = useOverlay.use.closeAll();

  const hasOpenOverlay = isCartOpen || isMenuOpen || isOrderOpen;

  const handleTabPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (hasOpenOverlay) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleTabPress);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleTabPress);
    }
  }, [hasOpenOverlay, handleTabPress]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <Suspense fallback={<PageLoader />} key="menu">
          <Menu />
        </Suspense>
      )}

      {isCartOpen && (
        <Suspense fallback={<PageLoader />} key="cart">
          <Cart />
        </Suspense>
      )}

      {isOrderOpen && (
        <Suspense fallback={<PageLoader />} key="order">
          <OrderModal />
        </Suspense>
      )}

      {hasOpenOverlay && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-black/50"
          onClick={closeAll}
        />
      )}
    </AnimatePresence>
  );
};
