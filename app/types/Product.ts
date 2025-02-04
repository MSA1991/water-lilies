export type ProductVariants = {
  size: string;
  price: number;
  discount: number;
  inStock: boolean;
};

export type Product = {
  title: string;
  image: string;
  flowerDiameter: string;
  plantingDepth: string;
  variants: ProductVariants[];
};

export type CartProduct = Pick<Product, 'title' | 'image'> & {
  id: string;
  variant: ProductVariants;
  quantity: number;
};
