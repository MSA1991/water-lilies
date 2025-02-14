import { useEffect, useState } from 'react';
import { useActionData } from '@remix-run/react';
import * as m from 'motion/react-client';
import { clsx } from 'clsx';
import {
  XMarkIcon,
  CheckIcon,
  FaceFrownIcon,
} from '@heroicons/react/24/outline';
import { OrderForm } from './OrderForm';
import { useCart } from '~/store/cart';
import { OrderFormResponse } from '~/types/OrderFormData';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const variants = {
  visible: { scale: 1, display: 'block' },
  hidden: { scale: 0, display: 'none' },
};

export const OrderModal = ({ isOpen, onClose }: Props) => {
  const actionData = useActionData<OrderFormResponse>();
  const [formState, setFormState] = useState(actionData);
  const clearCart = useCart.use.clearCart();

  useEffect(() => {
    setFormState(actionData);

    if (actionData?.success) {
      clearCart();
    }
  }, [actionData, clearCart]);

  const handleCloseModal = () => {
    onClose();
    setFormState({});
  };

  return (
    <div
      className={clsx('flex-center fixed inset-0 z-50 p-2', {
        hidden: !isOpen,
      })}
    >
      <m.div
        initial={false}
        variants={variants}
        animate={isOpen ? 'visible' : 'hidden'}
        transition={{ type: 'spring', damping: 12 }}
        className="relative w-full max-w-[500px] rounded-xl bg-white p-4"
      >
        <button
          type="button"
          onClick={handleCloseModal}
          className="absolute right-2 top-2 sm:right-4 sm:top-4"
        >
          <XMarkIcon className="icon" />
        </button>

        {!formState?.success && !formState?.errors?.sendMessage && (
          <>
            <h2 className="title-mb text-center text-xl font-bold sm:text-2xl">
              Оформлення замовлення
            </h2>

            <OrderForm />
          </>
        )}

        {formState?.success && (
          <div className="flex flex-col items-center gap-5 p-10">
            <CheckIcon className="h-80 w-80 stroke-2 text-secondary-light" />

            <h3 className="text-center text-xl font-bold">
              Дякуємо за замовлення.
              <br />
              Ми зв`яжемося з Вами найближчим часом.
            </h3>
          </div>
        )}

        {formState?.errors?.sendMessage && (
          <div className="flex flex-col items-center gap-5 p-10">
            <FaceFrownIcon className="h-80 w-80 stroke-2 text-primary-light" />

            <h3 className="text-center text-xl font-bold">
              {formState.errors.sendMessage}
            </h3>
          </div>
        )}
      </m.div>
    </div>
  );
};
