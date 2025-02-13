import * as m from 'motion/react-client';
import { Link as ScrollLink } from 'react-scroll';
import { clsx } from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Overlay } from './Overlay';
import { useLockScroll } from '~/hooks/useLockScroll';
import { useSectionsOffset } from '~/store/sectionsOffset';
import { PAGE_SECTIONS } from '~/data/pageSections';
import { PageSectionsId } from '~/types/PageSections';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const menuVariants = {
  open: { x: '0%', display: 'block' },
  closed: { x: '-100%', display: 'none' },
};

const linkVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

export const Menu = ({ isOpen, onClose }: Props) => {
  const sectionOffset = useSectionsOffset.use.sectionOffset();
  const footerOffset = useSectionsOffset.use.footerOffset();

  useLockScroll(isOpen);

  return (
    <div className="md:hidden">
      <m.aside
        initial={false}
        variants={menuVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', damping: 12 }}
        className="fixed left-0 top-0 z-50 h-full min-h-screen w-full bg-white sm:max-w-[500px]"
      >
        <div className="flex-center relative h-full gap-7 overflow-hidden">
          <button
            type="button"
            className="absolute right-2 top-2 sm:right-4 sm:top-4"
            onClick={onClose}
          >
            <XMarkIcon className="icon" />
          </button>

          <ul className="flex flex-col items-center gap-5">
            {PAGE_SECTIONS.map(({ id, label }, i) => {
              const isFooter = PageSectionsId.Contacts === id;
              const currentOffset = isFooter ? footerOffset : sectionOffset;

              return (
                <m.li
                  key={label}
                  initial={false}
                  variants={linkVariants}
                  animate={isOpen ? 'visible' : 'hidden'}
                  transition={{ type: 'spring', damping: 12, delay: 0.1 * i }}
                >
                  <ScrollLink
                    to={id}
                    smooth={true}
                    offset={currentOffset}
                    duration={300}
                    onClick={onClose}
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
      </m.aside>

      <Overlay isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
