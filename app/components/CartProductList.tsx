import * as m from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { CartProduct } from './CartProduct';
import { CartProduct as CartProductType } from '~/types/Product';

type Props = {
  products: CartProductType[];
};

export const CartProductList = ({ products }: Props) => (
  <ul className="flex grow flex-col">
    <AnimatePresence>
      {products.map((product) => (
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
);
