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
import { getProducts } from '~/services/contentful';
import { useSectionsOffset } from '~/store/sectionsOffset';
import { useDebounce } from '~/hooks/useDebounce';
import { getFormErrors } from '~/helpers/getFormErrors';
import { createFormData } from '~/helpers/createFormData';
import { PageSectionsId } from '~/types/PageSections';
import { OrderFormData } from '~/types/OrderFormData';
import { sendMessage } from '~/services/telegram';

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'Купить німфеї (водяні лілії, латаття) для водойми | Різноманіття сортів, доставка по всій Україні',
    },
    {
      name: 'description',
      content:
        'Купить німфеї (водяні лілії, латаття) рослини для вашої водойми! Різноманіття сортів, кращі ціни та швидка відправка по всій Україні «Новою Поштою»',
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
      <About />
      <Catalog products={products} />
      <Delivery />
      <Faq />
      <Footer />
      <Cart />
    </>
  );
}
