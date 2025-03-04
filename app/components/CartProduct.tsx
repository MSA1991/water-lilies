import { memo, useMemo } from 'react';
import { HiMiniMinus, HiPlus } from 'react-icons/hi2';
import { CgClose } from 'react-icons/cg';
import { useCart } from '~/store/cart';
import { CartProduct as CartProductType } from '~/types/Product';

type Props = {
  product: CartProductType;
};

export const CartProduct = memo(({ product }: Props) => {
  const { title, image, quantity, variant, id } = product;
  const { size, price, discount } = variant;

  const shortTitle = useMemo(
    () => title.split(' ').slice(1).join(' '),
    [title],
  );

  const increaseQuantity = useCart.use.increaseQuantity();
  const decreaseQuantity = useCart.use.decreaseQuantity();
  const removeProduct = useCart.use.removeProduct();

  return (
    <article className="border-box relative flex h-28 w-full gap-1 overflow-hidden rounded-xl bg-secondary-light/50 p-2 sm:h-32">
      <img
        src={image}
        alt={title}
        className="aspect-square h-full rounded-lg"
      />

      <div className="flex w-full flex-col justify-between">
        <div>
          <h3 className="line-clamp-1 font-bold sm:text-lg">{shortTitle}</h3>

          <div className="text-sm sm:text-base">
            Рослина: <span className="font-bold">{size}</span>
          </div>
        </div>

        <div className="text-lg font-bold sm:text-xl">
          Ціна: {(price - discount) * quantity} грн
        </div>
      </div>

      <div className="flex items-center gap-1 text-white">
        <button
          type="button"
          className="flex-center h-6 w-6 rounded-sm bg-secondary p-0.5"
          onClick={() => decreaseQuantity(id)}
        >
          <HiMiniMinus />
        </button>

        <div className="w-4 text-center font-bold text-black">{quantity}</div>

        <button
          type="button"
          className="flex-center h-6 w-6 rounded-sm bg-secondary p-0.5"
          onClick={() => increaseQuantity(id)}
        >
          <HiPlus />
        </button>
      </div>

      <button
        type="button"
        className="absolute right-2 top-1"
        onClick={() => removeProduct(id)}
      >
        <CgClose className="icon h-6 w-6" />
      </button>
    </article>
  );
});

CartProduct.displayName = 'CartProduct ';
