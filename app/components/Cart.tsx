import * as m from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { CartProduct } from './CartProduct';
import { Overlay } from './Overlay';
import { Button } from './UI/Button';
import { useCart } from '~/store/cart';
import { useLockScroll } from '~/hooks/useLockScroll';
import emptyCart from '../assets/images/empty-cart.svg';

const variants = {
  open: { x: '0%', display: 'flex' },
  closed: { x: '100%', display: 'none' },
};

export const Cart = () => {
  const isOpenCart = useCart.use.isOpen();
  const toggleIsOpenCart = useCart.use.toggleIsOpen();
  const productsCart = useCart.use.products();

  useLockScroll(isOpenCart);

  const totalPrice = productsCart.reduce(
    (sum, { quantity, variant: { price, discount } }) =>
      sum + (price - discount) * quantity,
    0,
  );

  return (
    <>
      <m.div
        initial={false}
        variants={variants}
        animate={isOpenCart ? 'open' : 'closed'}
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
          <div className="scroll-hidden flex grow flex-col gap-5 overflow-y-auto">
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

              <div className="h-1 w-full rounded-full bg-secondary" />

              <Button type="button" text="замовити" />
            </div>
          </div>
        )}

        <div className="absolute -right-12 top-0 h-full w-14 bg-white" />

        <div
          className={clsx(
            'absolute right-1/2 top-1/4 -z-10 aspect-square w-1/2 rounded-full',
            '-translate-y-1/2 translate-x-1/2 bg-yellow blur-3xl',
          )}
        />
      </m.div>

      <Overlay isVisible={isOpenCart} toggleIsVisible={toggleIsOpenCart} />
    </>
  );
};
