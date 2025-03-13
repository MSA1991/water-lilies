import { clsx } from 'clsx';
import { AiFillInstagram } from 'react-icons/ai';
import { WORK_HOURS } from '~/data/workHours';
import { PageSectionsId } from '../types/PageSections';
import frog from '../assets/images/frog.svg';

export const Footer = () => (
  <footer className="section-bg" id={PageSectionsId.Contacts}>
    <div className="section-py container relative z-0 flex md:justify-end">
      <img
        src={frog}
        alt="frog"
        loading="lazy"
        className={clsx(
          'absolute bottom-0 right-0 -z-10 w-1/2 min-w-64 max-w-lg scale-x-[-1] opacity-40',
          'md:left-0 md:w-2/5 md:min-w-96 md:scale-x-[1]',
        )}
      />

      <div className="flex w-full flex-col gap-5 text-lg font-bold sm:w-2/3 md:w-1/2 md:gap-7 md:text-xl lg:text-2xl">
        <h2 className="section-title">Контакти</h2>

        <div className="flex flex-col gap-2">
          <div>
            Телефон:{' '}
            <a
              href="tel:+380666915982"
              className="text-primary transition-colors hover:text-primary-light"
            >
              +38 (066) 691-59-82
            </a>
          </div>

          <div>
            Email:{' '}
            <a
              href="mailto:water.lilies.ua@gmail.com"
              className="text-primary transition-colors hover:text-primary-light"
            >
              water.lilies.ua@gmail.com
            </a>
          </div>

          <div className="flex gap-2">
            Соціальні мережі:{' '}
            <a
              href="https://www.instagram.com/nymphaea_shop_ua"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Перейти до інстаграму"
              className="text-primary transition-colors hover:text-primary-light"
            >
              <AiFillInstagram className="icon" />
            </a>
          </div>
        </div>

        <div>
          Графік роботи:
          <ul className="mt-2 text-base lg:text-xl">
            {WORK_HOURS.map(({ day, hours }) => (
              <li key={day} className="grid w-full grid-cols-2">
                <div>{day}:</div>
                <div>{hours}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
