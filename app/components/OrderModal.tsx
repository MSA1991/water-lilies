import * as m from 'motion/react-client';
import { clsx } from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { OrderForm } from './OrderForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const variants = {
  visible: { scale: 1, display: 'block' },
  hidden: { scale: 0, display: 'none' },
};

export const OrderModal = ({ isOpen, onClose }: Props) => {
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
        <h2 className="title-mb text-center text-xl font-bold sm:text-2xl">
          Оформлення замовлення
        </h2>

        <button
          onClick={onClose}
          className="absolute right-2 top-2 sm:right-4 sm:top-4"
        >
          <XMarkIcon className="icon" />
        </button>

        <OrderForm />
      </m.div>
    </div>
  );
};
