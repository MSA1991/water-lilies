import { useCallback, useEffect } from 'react';
import type {
  ActionFunctionArgs,
  HeadersFunction,
  MetaFunction,
} from '@remix-run/node';
import { data, useLoaderData } from '@remix-run/react';
import { Navigation } from '~/components/Navigation';
import { Header } from '~/components/Header';
import { About } from '~/components/About';
import { Catalog } from '~/components/Catalog';
import { Delivery } from '~/components/Delivery';
import { Faq } from '~/components/Faq';
import { Footer } from '~/components/Footer';
import { Cart } from '~/components/Cart';
import { useSectionsOffset } from '~/store/sectionsOffset';
import { getProducts } from '~/services/contentful';
import { sendMessage } from '~/services/telegram';
import { getFormErrors } from '~/helpers/getFormErrors';
import { createFormData } from '~/helpers/createFormData';
import { useDebounce } from '~/hooks/useDebounce';
import { PageSectionsId } from '~/types/PageSections';
import { OrderFormData } from '~/types/OrderFormData';

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'Купити німфеї, водяні лілії, латаття для ставка! Доставка по Україні',
    },
    {
      name: 'description',
      content:
        'Купити німфеї, водяні лілії, латаття, кувшинки. Рослини для водойм. Різноманіття сортів, кращі ціни та швидка доставка по всій Україні Новою Поштою',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'keywords',
      content:
        'Купити німфеї, водяні лілії, латаття, кувшинки, водні рослини для ставка, купити в Україні',
    },
    {
      property: 'og:title',
      content:
        'Купити німфеї, водяні лілії, латаття для ставка! Доставка по Україні',
    },
    {
      property: 'og:description',
      content:
        'Купити німфеї, водяні лілії, латаття, кувшинки. Рослини для водойм. Різноманіття сортів, кращі ціни та швидка доставка по всій Україні Новою Поштою',
    },
    { property: 'og:image', content: 'https://i.imgur.com/1WKhzeF.jpg' },
    {
      property: 'og:image:width',
      content: '1200',
    },
    {
      property: 'og:image:height',
      content: '630',
    },
    { property: 'og:url', content: 'https://nymphaea.shop' },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:site_name',
      content: 'Nymphaea Shop - магазин німфей, водяних лілій',
    },
  ];
};

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'max-age=3600, s-maxage=3600',
});

export const loader = async () => getProducts();

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const orderFormData: OrderFormData = createFormData(formData);

  const errors = getFormErrors(orderFormData);

  if (Object.keys(errors).length) {
    return data({ errors }, { status: 400 });
  }

  const isMessageSent = await sendMessage(orderFormData);

  if (!isMessageSent)
    return data({
      errors: {
        sendMessage: 'Не вдалося надіслати повідомлення, спробуйте пізніше',
      },
    });

  return data({ success: true });
}

const SCROLL_OFFSET_RATIO = 0.25;

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
      <Navigation />
      <Header />
      <main>
        <About />
        <Catalog products={products} />
        <Delivery />
        <Faq />
      </main>
      <Footer />
      <Cart />
    </>
  );
}
