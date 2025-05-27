import { useEffect, useRef, useState } from 'react';
import { useActionData } from '@remix-run/react';
import * as m from 'motion/react-m';
import { CgClose } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { FaRegFaceFrown } from 'react-icons/fa6';

import { OrderForm } from './OrderForm';

import { useCart } from '~/store/cart';
import { useOverlay } from '~/store/overlay';
import { OrderFormResponse } from '~/types/OrderFormData';

export const OrderModal = () => {
  const actionData = useActionData<OrderFormResponse>();
  const [formData, setFormData] = useState<OrderFormResponse | null>(null);
  const clearCart = useCart.use.clearCart();
  const toggleOrder = useOverlay.use.toggleOrder();
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setFormData(null);
      isFirstRender.current = false;
      return;
    }

    if (!actionData) return;

    setFormData(actionData);

    if (actionData.success) {
      clearCart();
    }
  }, [actionData, clearCart]);

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 p-4">
      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
        transition={{ type: 'spring', damping: 12 }}
        className="relative rounded-xl bg-white p-4"
      >
        <button
          type="button"
          onClick={toggleOrder}
          className="absolute right-2 top-2 sm:right-4 sm:top-4"
        >
          <CgClose className="icon" />
        </button>

        {!formData?.success && !formData?.errors?.sendMessage && (
          <>
            <h2 className="title-mb text-center text-xl font-bold sm:text-2xl">
              Оформлення замовлення
            </h2>

            <OrderForm formErrors={formData?.errors} />
          </>
        )}

        {formData?.success && (
          <div className="flex flex-col items-center gap-5 p-10">
            <FaCheck className="h-60 w-60 text-secondary-light" />

            <p className="text-center text-xl font-bold">
              Дякуємо за замовлення.
              <br />
              Ми зв`яжемося з Вами найближчим часом.
            </p>
          </div>
        )}

        {formData?.errors?.sendMessage && (
          <div className="flex flex-col items-center gap-5 p-10">
            <FaRegFaceFrown className="h-60 w-60 text-primary-light" />

            <p className="text-center text-xl font-bold">
              {formData.errors.sendMessage}
            </p>
          </div>
        )}
      </m.div>
    </div>
  );
};
