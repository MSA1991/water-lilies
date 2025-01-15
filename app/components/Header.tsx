import { Navigation } from './Navigation';
import { Button } from './Button';
import { ParallaxImage } from './ParallaxImage';
import { PageSectionsId } from '../types/PageSections';

export const Header = () => {
  return (
    <header className="relative overflow-hidden" id={PageSectionsId.Home}>
      <div className="absolute left-0 top-0 -z-10 aspect-square w-3/4 min-w-96 -translate-x-1/3 -translate-y-1/4 rounded-full bg-secondary-light blur-3xl md:-translate-y-2/4 lg:-translate-y-3/4"></div>
      <div className="absolute right-0 top-0 h-3/5 w-2/4 -translate-y-1/4 translate-x-1/4 rotate-[20deg] rounded-full bg-gradient-to-r from-secondary-light from-30% to-yellow blur-3xl"></div>

      <Navigation />

      <div className="container mb-14 mt-24 flex flex-col-reverse items-center md:mb-16 md:mt-36 md:flex-row lg:mb-32 lg:mt-48">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-8 lg:gap-10">
          <h1 className="text-6xl font-bold md:text-8xl lg:text-9xl">Німфеї</h1>

          <p className="section-title">Краса і гармонія для вашої водойми</p>

          <Button type="button" text="замовити" />
        </div>

        <ParallaxImage />
      </div>
    </header>
  );
};
