import { useCallback, useEffect } from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Header } from '~/components/Header';
import { About } from '~/components/About';
import { Catalog } from '~/components/Catalog';
import { Delivery } from '~/components/Delivery';
import { Faq } from '~/components/Faq';
import { Footer } from '~/components/Footer';
import { getProducts } from '~/contentful';
import { useSectionsOffset } from '~/store/sectionsOffset';
import { useDebounce } from '~/hooks/useDebounce';
import { PageSectionsId } from '~/types/PageSections';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'max-age=3600, s-maxage=3600',
});

export const loader = async () => getProducts();

const SCROLL_OFFSET_RATIO = 0.3;

export default function Index() {
  const products = useLoaderData<typeof loader>();

  const setSectionOffset = useSectionsOffset.use.setSectionOffset();
  const setFooterOffset = useSectionsOffset.use.setFooterOffset();

  const onChangeOffset = useCallback(() => {
    const footer = document.getElementById(PageSectionsId.Contacts);
    const footerHeight = footer?.offsetHeight || 0;
    const windowHeight = window.innerHeight;

    const sectionOffset = -Math.round(windowHeight * SCROLL_OFFSET_RATIO);
    const footerOffset = Math.min(sectionOffset, footerHeight - windowHeight);

    setSectionOffset(sectionOffset);
    setFooterOffset(footerOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedChangeOffset = useDebounce(onChangeOffset, 300);

  useEffect(() => {
    onChangeOffset();

    window.addEventListener('resize', debouncedChangeOffset);

    return () => {
      window.removeEventListener('resize', debouncedChangeOffset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
