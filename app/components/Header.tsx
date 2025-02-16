import { Link as ScrollLink } from 'react-scroll';
import * as m from 'motion/react-client';
import { clsx } from 'clsx';
import { ParallaxImage } from './ParallaxImage';
import { useSectionsOffset } from '~/store/sectionsOffset';
import { PageSectionsId } from '../types/PageSections';

export const Header = () => {
  const sectionOffset = useSectionsOffset.use.sectionOffset();

  return (
    <header className="relative overflow-hidden" id={PageSectionsId.Home}>
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

      <div className="container mb-14 mt-24 flex flex-col-reverse items-center md:mb-16 md:mt-36 md:flex-row lg:mb-32 lg:mt-48">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-8 lg:gap-10">
          <m.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            className="text-6xl font-bold md:text-8xl lg:text-9xl"
          >
            Німфеї
          </m.h1>

          <m.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.3 }}
            className="section-title text-center md:text-left"
          >
            Краса і гармонія для вашої водойми
          </m.p>

          <m.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.6 }}
            className="w-full max-w-48"
          >
            <ScrollLink
              to={PageSectionsId.Catalog}
              smooth={true}
              offset={sectionOffset}
              duration={300}
              isDynamic={true}
              className="button"
            >
              замовити
            </ScrollLink>
          </m.div>
        </div>

        <ParallaxImage />
      </div>
    </header>
  );
};
