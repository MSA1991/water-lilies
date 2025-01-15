import type { MetaFunction } from '@remix-run/node';
import { About } from '~/components/About';
import { Delivery } from '~/components/Delivery';
import { Faq } from '~/components/Faq';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { Catalog } from '~/components/Catalog';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <>
      <Header />
      <About />
      <Catalog />
      <Delivery />
      <Faq />
      <Footer />
    </>
  );
}
