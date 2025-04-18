import { useState } from 'react';
import { clsx } from 'clsx';

import { Button } from './UI/Button';

import { Product, ProductVariants } from '~/types/Product';

type Props = {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariants) => void;
};

export const ProductCard = ({ product, onAddToCart }: Props) => {
  const { image, title, flowerDiameter, plantingDepth, variants } = product;
  const [activeVariant, setActiveVariant] = useState(variants[0]);
  const { size, discount, price, inStock } = activeVariant;

  const handleChangeActiveVariant = (variant: ProductVariants) => {
    setActiveVariant(variant);
  };

  return (
    <article className="border-box overflow-hidden rounded-xl bg-secondary-light/50">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="aspect-square w-full"
      />

      <div className="flex flex-col justify-between gap-4 p-2">
        <h3 className="line-clamp-2 h-12 text-lg font-bold leading-6">
          {title}
        </h3>

        <div className="[&>div>span]:font-bold">
          <div>
            Діаметр квітки: <span>{flowerDiameter}</span>
          </div>
          <div>
            Глибина посадки: <span>{plantingDepth}</span>
          </div>
          <div>
            Вік рослини: <span>{size}</span>
          </div>
        </div>

        <ul className="flex justify-between gap-2">
          {variants.map((variant) => (
            <li key={variant.size} className="grow">
              <button
                type="button"
                aria-label="Вибрати вік рослини"
                className={clsx(
                  'border-box w-full rounded p-1 font-bold transition-colors',
                  {
                    'bg-secondary text-white': variant.size === size,
                  },
                )}
                onClick={() => handleChangeActiveVariant(variant)}
              >
                {variant.size}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-1.5 text-xl font-bold">
          Ціна:{' '}
          {discount > 0 ? (
            <div>
              {price - discount} грн
              <span className="ml-1.5 line-through opacity-50">
                {price} грн
              </span>
            </div>
          ) : (
            <div>{price} грн</div>
          )}
        </div>

        <Button
          type="button"
          disabled={!inStock}
          text={inStock ? 'в кошик' : 'закінчилися'}
          onClick={() => onAddToCart(product, activeVariant)}
        />
      </div>
    </article>
  );
};
