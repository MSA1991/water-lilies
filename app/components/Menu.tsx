import * as m from 'motion/react-m';
import { Link as ScrollLink } from 'react-scroll';
import { CgClose } from 'react-icons/cg';
import { clsx } from 'clsx';

import { useSectionsOffset } from '~/store/sectionsOffset';
import { useOverlay } from '~/store/overlay';
import { PAGE_SECTION_LINKS } from '~/data/pageSectionLinks';
import { PageSectionsId } from '~/types/PageSections';

export const Menu = () => {
  const sectionOffset = useSectionsOffset.use.sectionOffset();
  const footerOffset = useSectionsOffset.use.footerOffset();
  const toggleMenu = useOverlay.use.toggleMenu();

  return (
    <m.nav
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } }}
      transition={{ type: 'spring', damping: 12 }}
      className="fixed left-0 top-0 z-50 h-full min-h-screen w-full bg-white sm:max-w-[500px]"
    >
      <div className="flex-center relative h-full gap-7 overflow-hidden">
        <button
          type="button"
          className="absolute right-2 top-2 sm:right-4 sm:top-4"
          onClick={toggleMenu}
        >
          <CgClose className="icon-lg" />
        </button>

        <ul className="flex flex-col items-center gap-5">
          {PAGE_SECTION_LINKS.map(({ id, label }, i) => {
            const isFooter = PageSectionsId.Contacts === id;
            const currentOffset = isFooter ? footerOffset : sectionOffset;

            return (
              <m.li
                key={label}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', damping: 12, delay: 0.1 * i }}
              >
                <ScrollLink
                  to={id}
                  href={`#${id}`}
                  smooth={true}
                  offset={currentOffset}
                  duration={300}
                  onClick={toggleMenu}
                  className="cursor-pointer text-2xl font-bold transition-colors hover:text-primary"
                >
                  {label}
                </ScrollLink>
              </m.li>
            );
          })}
        </ul>

        <div
          className={clsx(
            'absolute bottom-0 right-0 h-5/6 w-5/6 translate-x-1/4 -rotate-12 rounded-full',
            '-z-10 bg-gradient-to-b from-secondary-light from-60% to-yellow blur-3xl',
          )}
        />
      </div>
      <div className="absolute -left-12 top-0 h-full w-14 bg-white" />
    </m.nav>
  );
};
