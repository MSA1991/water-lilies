import { useCallback, useEffect } from 'react';
import * as m from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { CartProduct } from './CartProduct';
import { Button } from './UI/Button';
import { useCart } from '~/store/cart';
import emptyCart from '../assets/images/empty-cart.svg';

export const Cart = () => {
  const isOpenCart = useCart.use.isOpen();
  const toggleIsOpenCart = useCart.use.toggleIsOpen();
  const productsCart = useCart.use.products();

  const totalPrice = productsCart.reduce(
    (sum, { quantity, variant: { price, discount } }) =>
      sum + (price - discount) * quantity,
    0,
  );

  const handleTabPress = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (isOpenCart) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleTabPress);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleTabPress);
    }
  }, [isOpenCart, handleTabPress]);

  return (
    <>
      <m.div
        initial={false}
        animate={{ x: isOpenCart ? '0' : '100%' }}
        transition={{ type: 'spring', damping: 12 }}
        className={clsx(
          'fixed right-0 top-0 z-50 h-full min-h-screen bg-white p-2 sm:p-4',
          'flex w-full flex-col gap-7 sm:max-w-[500px]',
        )}
      >
        <div className="flex">
          <button onClick={toggleIsOpenCart}>
            <ArrowRightIcon className="icon stroke-2" />
          </button>

          <h2 className="section-title grow text-center">Ваш кошик</h2>
        </div>

        {!productsCart.length ? (
          <div className="flex-center grow flex-col">
            <h3 className="text-2xl font-bold">Кошик порожній</h3>
            <img src={emptyCart} alt="empty cart" className="w-10/12" />
          </div>
        ) : (
          <div className="scroll-hidden flex grow flex-col gap-5 overflow-x-auto">
            <ul className="flex grow flex-col">
              <AnimatePresence>
                {productsCart.map((product) => (
                  <m.li
                    key={product.id}
                    exit={{ opacity: 0, height: 0, x: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="pb-2">
                      <CartProduct product={product} />
                    </div>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold">
                До сплати: {totalPrice} грн
              </div>

              <div className="h-1 w-full rounded-full bg-secondary"></div>

              <Button type="button" text="замовити" />
            </div>
          </div>
        )}

        <div className="absolute -right-10 top-0 h-full w-12 bg-white" />
        <div
          className={clsx(
            'absolute right-1/2 top-1/4 -z-10 aspect-square w-1/2 rounded-full',
            '-translate-y-1/2 translate-x-1/2 bg-yellow blur-3xl',
          )}
        />
      </m.div>

      <AnimatePresence>
        {isOpenCart && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={toggleIsOpenCart}
          />
        )}
      </AnimatePresence>
    </>
  );
};
