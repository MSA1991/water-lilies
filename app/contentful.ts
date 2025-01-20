import { Asset, createClient, EntryFieldTypes } from 'contentful';
import { Product, ProductVariants } from './types/Product';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID as string;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN as string;

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

type ProductSkeleton = {
  contentTypeId: 'nymphaea';
  fields: {
    title: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
    flowerDiameter: EntryFieldTypes.Text;
    plantingDepth: EntryFieldTypes.Text;
    variants: EntryFieldTypes.Object;
  };
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await client.getEntries<ProductSkeleton>({
    content_type: 'nymphaea',
  });

  const products = res.items.map(({ fields }) => ({
    title: fields.title,
    image: `https:${(fields.image as Asset).fields.file!.url}`,
    flowerDiameter: fields.flowerDiameter,
    plantingDepth: fields.plantingDepth,
    variants: fields.variants as ProductVariants[],
  }));

  return products as Product[];
};
