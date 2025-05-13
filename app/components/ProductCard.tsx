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
    <article
      itemScope
      itemType="https://schema.org/Product"
      className="border-box overflow-hidden rounded-xl bg-secondary-light/50"
    >
      <img
        itemProp="image"
        src={image}
        alt={title}
        loading="lazy"
        className="aspect-square w-full"
      />

      <div className="flex flex-col justify-between gap-4 p-2">
        <h3
          itemProp="name"
          className="line-clamp-2 h-12 text-lg font-bold leading-6"
        >
          {title}
        </h3>

        <ul className="[&>li>span[itemProp='value']]:font-bold">
          <li itemScope itemType="https://schema.org/PropertyValue">
            <span itemProp="name">Діаметр квітки</span>:{' '}
            <span itemProp="value">{flowerDiameter}</span>
          </li>

          <li itemScope itemType="https://schema.org/PropertyValue">
            <span itemProp="name">Глибина посадки</span>:{' '}
            <span itemProp="value">{plantingDepth}</span>
          </li>

          <li itemScope itemType="https://schema.org/PropertyValue">
            <span itemProp="name">Вік рослини</span>:{' '}
            <span itemProp="value">{size}</span>
          </li>
        </ul>

        <ul data-nosnippet className="flex justify-between gap-2">
          {variants.map((variant) => (
            <li key={variant.size} className="grow">
              <button
                type="button"
                aria-label={`Вибрати вік рослини: ${variant.size}`}
                aria-pressed={variant.size === size}
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

        <div
          itemScope
          itemProp="offers"
          itemType="https://schema.org/Offer"
          className="flex gap-1.5 text-xl font-bold"
        >
          <div>
            Ціна: <span itemProp="price">{price - discount}</span> грн
          </div>

          {discount > 0 && (
            <span className="line-through opacity-50">{price} грн</span>
          )}

          <meta itemProp="priceCurrency" content="UAH" />
          <link
            itemProp="availability"
            href={`https://schema.org/${inStock ? 'InStock' : 'OutOfStock'}`}
          />
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
