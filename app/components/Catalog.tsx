import { clsx } from 'clsx';

import { ProductCard } from './ProductCard';

import { useCart } from '~/store/cart';
import { Product, ProductVariants } from '~/types/Product';
import { PageSectionsId } from '../types/PageSections';

type Props = {
  products: Product[];
};

export const Catalog = ({ products }: Props) => {
  const addProductToCart = useCart.use.addProduct();

  const handleAddToCart = (product: Product, variant: ProductVariants) => {
    addProductToCart({
      id: crypto.randomUUID(),
      title: product.title,
      image: product.image,
      variant,
      quantity: 1,
    });
  };

  return (
    <section
      className="section-py container relative"
      id={PageSectionsId.Catalog}
    >
      <div
        className={clsx(
          'absolute left-1/2 top-1/2 -z-10 h-2/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full',
          'bg-gradient-to-r from-yellow from-10% to-secondary-light blur-3xl',
        )}
      />

      <h2 className="section-title title-mb text-center">Каталог квітів</h2>

      <ul className="container-sm grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <li key={product.title}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
};
