import { Link } from '@remix-run/react';
import { clsx } from 'clsx';
import nymphea from '../assets/images/nymphea.svg';

export const NotFound = () => (
  <section className="flex-center relative min-h-screen overflow-hidden">
    <div
      className={clsx(
        'absolute left-0 top-0 -z-10 aspect-square w-3/4 min-w-96 rounded-full bg-secondary-light blur-3xl',
        '-translate-x-1/3 -translate-y-1/4 md:-translate-y-2/4 lg:-translate-y-3/4',
      )}
    />
    <div
      className={clsx(
        'absolute right-0 top-0 -z-10 h-3/5 w-2/4 -translate-y-1/4 translate-x-1/4 rotate-[20deg] rounded-full',
        'bg-gradient-to-r from-secondary-light from-30% to-yellow blur-3xl',
      )}
    />

    <div className="flex flex-col items-center gap-4 font-bold text-secondary">
      <div className="flex items-center text-[150px] md:text-[300px] lg:text-[450px]">
        <span>4</span>

        <img
          src={nymphea}
          alt="nymphea"
          className="w-[150px] md:w-[300px] lg:w-[450px]"
        />

        <span>4</span>
      </div>

      <p className="text-2xl md:text-4xl lg:text-6xl">Сторінку не знайдено</p>

      <Link to="/" className="button max-w-48" prefetch="intent">
        на головну
      </Link>
    </div>
  </section>
);
