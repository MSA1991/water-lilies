import { Button } from './UI/Button';
import { PageSectionsId } from '../types/PageSections';

import dragonfly from '../assets/images/dragonfly.svg';
import clsx from 'clsx';

export const Delivery = () => (
  <section
    className="section-py bg-secondary-light"
    id={PageSectionsId.Delivery}
  >
    <div className="container relative z-0">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <h2 className="section-title">Доставка та оплата</h2>

        <p className="my-5 md:my-7 md:text-xl">
          Ми працюємо тільки по повній передоплаті, оскільки рослини потребують
          особливого догляду і можуть витримати транспортування лише в одному
          напрямку. Доставка здійснюється «Новою Поштою» по всій Україні. Після
          оформлення замовлення ми обов`язково зв`яжемося з вами, щоб уточнити
          всі необхідні дані для відправки. Ваше замовлення після оплати буде
          відправлено протягом 2-3 робочих днів.
          <br />
          <br />
          Усі рослини ретельно готуються до відправлення та добре промиваються і
          упаковуються з вологим, голим корінням, що дає змогу зберегти їхню
          свіжість і готовність до посадки. Якщо у вас виникли запитання, ми
          завжди з радістю готові допомогти і проконсультувати з усіх деталей.
        </p>

        <div className="max-w-48">
          <Button text="контакти" />
        </div>
      </div>

      <img
        src={dragonfly}
        alt="dragonfly"
        className={clsx(
          'absolute bottom-0 right-0 -z-10 translate-y-14 opacity-70 md:translate-y-16 lg:translate-y-20',
          'w-full max-w-96 md:w-3/5 md:max-w-full lg:w-1/2 lg:min-w-[600px]',
        )}
      />
    </div>
  </section>
);
