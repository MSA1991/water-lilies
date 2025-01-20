import type { MetaFunction } from '@remix-run/node';
import { About } from '~/components/About';
import { Delivery } from '~/components/Delivery';
import { Faq } from '~/components/Faq';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { Catalog } from '~/components/Catalog';
import { getProducts } from '~/contentful';
import { useLoaderData } from '@remix-run/react';
import { Product } from '~/types/Product';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => getProducts();

export default function Index() {
  const products = useLoaderData<Product[]>();

  return (
    <>
      <Header />
      <About />
      <Catalog products={products} />
      <Delivery />
      <Faq />
      <Footer />
    </>
  );
}
