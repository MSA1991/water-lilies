import { useEffect, useState } from 'react';
import { useActionData } from '@remix-run/react';
import * as m from 'motion/react-m';
import { clsx } from 'clsx';
import { CgClose } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { FaRegFaceFrown } from 'react-icons/fa6';
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
          <CgClose className="icon" />
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
            <FaCheck className="h-60 w-60 text-secondary-light" />

            <p className="text-center text-xl font-bold">
              Дякуємо за замовлення.
              <br />
              Ми зв`яжемося з Вами найближчим часом.
            </p>
          </div>
        )}

        {formState?.errors?.sendMessage && (
          <div className="flex flex-col items-center gap-5 p-10">
            <FaRegFaceFrown className="h-60 w-60 text-primary-light" />

            <p className="text-center text-xl font-bold">
              {formState.errors.sendMessage}
            </p>
          </div>
        )}
      </m.div>
    </div>
  );
};
