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
