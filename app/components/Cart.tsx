import * as m from 'motion/react-m';
import { FaArrowRight } from 'react-icons/fa6';
import { clsx } from 'clsx';

import { Button } from './UI/Button';
import { CartProductList } from './CartProductList';

import { useCart } from '~/store/cart';
import { useOverlay } from '~/store/overlay';
import { getTotalPrice } from '~/helpers/getTotalPrice';

import emptyCart from '../assets/images/empty-cart.svg';

export const Cart = () => {
  const productsCart = useCart.use.products();
  const toggleCart = useOverlay.use.toggleCart();
  const toggleOrder = useOverlay.use.toggleOrder();

  const totalPrice = getTotalPrice(productsCart);

  return (
    <m.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } }}
      transition={{ type: 'spring', damping: 12 }}
      className={clsx(
        'fixed right-0 top-0 z-50 h-dvh bg-white p-2 sm:p-4',
        'flex w-full flex-col gap-7 sm:max-w-[500px]',
      )}
    >
      <h2 className="section-title text-center">Ваш кошик</h2>

      <button
        type="button"
        onClick={toggleCart}
        className="absolute left-2 top-2 sm:left-4 sm:top-4"
      >
        <FaArrowRight className="icon-lg" />
      </button>

      {!productsCart.length ? (
        <div className="flex-center grow flex-col">
          <h3 className="section-title">Кошик порожній</h3>

          <img
            src={emptyCart}
            alt="кошик порожній"
            loading="lazy"
            className="h-auto w-60 md:w-96"
          />
        </div>
      ) : (
        <div className="scroll-hidden flex grow flex-col gap-5 overflow-y-auto">
          <CartProductList products={productsCart} />

          <div className="flex flex-col gap-4">
            <div className="h-1 w-full rounded-full bg-secondary" />

            <div>
              <p className="text-2xl font-bold">До сплати: {totalPrice} грн</p>
              <p>+ вартість доставки за тарифом перевізника</p>
            </div>

            <Button
              type="button"
              text="Оформити замовлення"
              onClick={toggleOrder}
            />
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
    </m.aside>
  );
};
