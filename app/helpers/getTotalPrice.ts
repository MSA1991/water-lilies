import { CartProduct } from '~/types/Product';

export const getTotalPrice = (products: CartProduct[]): number =>
  products.reduce(
    (sum, { quantity, variant: { price, discount } }) =>
      sum + (price - discount) * quantity,
    0,
  );
