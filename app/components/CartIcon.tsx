import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';
import { HiShoppingBag } from 'react-icons/hi2';

import { useCart } from '~/store/cart';
import { useOverlay } from '~/store/overlay';

export const CartIcon = () => {
  const productsCart = useCart.use.products();
  const toggleCart = useOverlay.use.toggleCart();

  return (
    <div className="relative">
      <button
        aria-label="відкрити кошик"
        type="button"
        className="block"
        onClick={toggleCart}
      >
        <HiShoppingBag className="icon-lg drop-shadow-white" />
      </button>

      <AnimatePresence>
        {!!productsCart.length && (
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{
              scale: 0,
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            transition={{ type: 'spring' }}
            className="flex-center absolute -right-2 -top-2 h-5 w-5 rounded-full bg-secondary text-white"
          >
            {productsCart.length}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
