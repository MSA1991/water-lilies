import { Link as ScrollLink } from 'react-scroll';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-client';
import { useSectionsOffset } from '~/store/sectionsOffset';
import { PAGE_SECTIONS } from '~/data/pageSections';
import { PageSectionsId, SectionLinks } from '../types/PageSections';

type Props = {
  activeLinkId: PageSectionsId | null;
  onChangeActiveLink: (id: SectionLinks) => void;
};

export const NavLinks = ({ activeLinkId, onChangeActiveLink }: Props) => {
  const sectionOffset = useSectionsOffset.use.sectionOffset();
  const footerOffset = useSectionsOffset.use.footerOffset();

  return (
    <ul className="flex gap-7">
      {PAGE_SECTIONS.map(({ id, label }) => {
        const isFooter = PageSectionsId.Contacts === id;
        const currentOffset = isFooter ? footerOffset : sectionOffset;

        return (
          <li key={id}>
            <ScrollLink
              to={id}
              href={`#${id}`}
              spy={true}
              smooth={true}
              offset={currentOffset}
              duration={300}
              isDynamic={true}
              onSetActive={() => onChangeActiveLink(id)}
              className="drop-shadow-white relative cursor-pointer text-xl font-bold transition-colors hover:text-primary"
            >
              {label}

              <AnimatePresence>
                {activeLinkId && (
                  <m.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-1 left-0 w-full"
                  >
                    {activeLinkId === id && (
                      <m.div
                        layoutId="underline"
                        className="h-0.5 w-full rounded-full bg-primary"
                      ></m.div>
                    )}
                  </m.div>
                )}
              </AnimatePresence>
            </ScrollLink>
          </li>
        );
      })}
    </ul>
  );
};
