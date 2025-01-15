import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-client';
import { ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Logo } from './Logo';
import { useThrottle } from '~/hooks/useThrottle';
import { PAGE_SECTIONS } from '~/data/pageSections';
import { PageSectionsId } from '../types/PageSections';

export const Navigation = () => {
  const [sectionOffset, setSectionOffset] = useState<number>(0);
  const [footerOffset, setFooterOffset] = useState<number>(0);
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);

  const handleSetActiveLink = (id: string | null) => {
    setActiveLinkId(id);
  };

  const onChangeOffset = useCallback(() => {
    const footer = document.getElementById(PageSectionsId.Contacts);
    const footerHeight = footer?.offsetHeight || 0;
    const windowHeight = window.innerHeight;

    const sectionOffset = -Math.round(windowHeight * 0.3);
    const footerOffset = Math.min(sectionOffset, footerHeight - windowHeight);

    setSectionOffset(sectionOffset);
    setFooterOffset(footerOffset);
  }, []);

  const handleThrottledResize = useThrottle(onChangeOffset, 300);

  useEffect(() => {
    handleThrottledResize();

    window.addEventListener('resize', handleThrottledResize);

    return () => {
      window.removeEventListener('resize', handleThrottledResize);
    };
  }, [handleThrottledResize]);

  return (
    <nav className="container fixed inset-x-0 top-4 z-50">
      <div className="flex items-center justify-between rounded-full border-2 border-secondary bg-secondary/20 px-4 py-2 shadow-xl backdrop-blur-xl md:px-8 md:py-4">
        <button type="button" className="md:hidden">
          <Bars3Icon className="icon" />
        </button>

        <Link
          to={PageSectionsId.Home}
          smooth={true}
          spy={true}
          offset={0}
          onSetActive={() => handleSetActiveLink(null)}
          className="cursor-pointer"
        >
          <Logo />
        </Link>

        <ul className="hidden gap-6 font-bold uppercase md:flex">
          {PAGE_SECTIONS.map(({ id, label }) => {
            const isFooter = PageSectionsId.Contacts === id;
            const currentOffset = isFooter ? footerOffset : sectionOffset;

            return (
              <li key={id}>
                <Link
                  to={id}
                  spy={true}
                  smooth={true}
                  offset={currentOffset}
                  duration={300}
                  onSetActive={() => handleSetActiveLink(id)}
                  className="relative cursor-pointer transition-colors hover:text-primary-light"
                >
                  {label}

                  <AnimatePresence>
                    {activeLinkId !== null && (
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
                </Link>
              </li>
            );
          })}
        </ul>

        <button type="button">
          <ShoppingBagIcon className="icon" />
        </button>
      </div>
    </nav>
  );
};
