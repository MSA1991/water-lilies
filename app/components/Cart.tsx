import { useState } from 'react';
import * as m from 'motion/react-client';
import { clsx } from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Overlay } from './Overlay';
import { Button } from './UI/Button';
import { CartProductList } from './CartProductList';
import { OrderModal } from './OrderModal';
import { useCart } from '~/store/cart';
import { useLockScroll } from '~/hooks/useLockScroll';
import { getTotalPrice } from '~/helpers/getTotalPrice';
import emptyCart from '../assets/images/empty-cart.svg';

const variants = {
  open: { x: '0%', display: 'flex' },
  closed: { x: '100%', display: 'none' },
};

export const Cart = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const isCartOpen = useCart.use.isOpen();
  const closeCart = useCart.use.closeCart();
  const productsCart = useCart.use.products();

  const handleOpenOrderModal = () => {
    closeCart();
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  useLockScroll(isCartOpen || isOrderModalOpen);

  const totalPrice = getTotalPrice(productsCart);

  return (
    <>
      <m.div
        initial={false}
        variants={variants}
        animate={isCartOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', damping: 12 }}
        className={clsx(
          'fixed right-0 top-0 z-50 h-full min-h-screen bg-white p-2 sm:p-4',
          'flex w-full flex-col gap-7 sm:max-w-[500px]',
        )}
      >
        <h2 className="section-title text-center">Ваш кошик</h2>

        <button
          type="button"
          onClick={closeCart}
          className="absolute left-2 top-2 sm:left-4 sm:top-4"
        >
          <ArrowRightIcon className="icon" />
        </button>

        {!productsCart.length ? (
          <div className="flex-center grow flex-col">
            <h3 className="text-2xl font-bold">Кошик порожній</h3>
            <img src={emptyCart} alt="empty cart" className="w-10/12" />
          </div>
        ) : (
          <div className="scroll-hidden flex grow flex-col gap-5 overflow-y-auto">
            <CartProductList products={productsCart} />

            <div className="flex flex-col gap-4">
              <div className="h-1 w-full rounded-full bg-secondary" />

              <div>
                <div className="text-2xl font-bold">
                  До сплати: {totalPrice} грн
                </div>
                <div>+ вартість доставки за тарифом перевізника</div>
              </div>

              <Button
                type="button"
                text="Оформити замовлення"
                onClick={handleOpenOrderModal}
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
      </m.div>

      <Overlay isOpen={isCartOpen || isOrderModalOpen} onClose={closeCart} />

      <OrderModal isOpen={isOrderModalOpen} onClose={handleCloseOrderModal} />
    </>
  );
};
