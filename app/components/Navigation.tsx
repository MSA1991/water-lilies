import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { LuMenu } from 'react-icons/lu';

import { Logo } from './UI/Logo';
import { NavLinks } from './NavLinks';
import { CartIcon } from './CartIcon';

import { useDebounce } from '~/hooks/useDebounce';
import { useOverlay } from '~/store/overlay';
import { PageSectionsId, VisibleSection } from '../types/PageSections';

export const Navigation = () => {
  const [activeLinkId, setActiveLinkId] = useState<VisibleSection>(null);
  const toggleMenu = useOverlay.use.toggleMenu();

  const onChangeActiveLink = (id: VisibleSection) => {
    if (id === activeLinkId) return;

    setActiveLinkId(id);
  };

  const debouncedChangeActiveLink = useDebounce(onChangeActiveLink, 300);

  return (
    <>
      <nav className="container sticky inset-x-0 top-4 z-30 -mt-14 h-14 md:-mt-[72px] md:h-[72px]">
        <div className="border-box flex h-full items-center justify-between rounded-xl bg-secondary-light/50 p-2 px-2.5 shadow-2xl backdrop-blur-xl md:p-4">
          <button
            aria-label="відкрити меню"
            type="button"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <LuMenu className="icon-lg drop-shadow-white" />
          </button>

          <ScrollLink
            to={PageSectionsId.Home}
            href={`#${PageSectionsId.Home}`}
            smooth={true}
            spy={true}
            offset={0}
            duration={300}
            isDynamic={true}
            onSetActive={() => debouncedChangeActiveLink(null)}
            aria-label="Перейти до початку сторінки"
            className="cursor-pointer"
          >
            <Logo />
          </ScrollLink>

          <div className="hidden md:block">
            <NavLinks
              activeLinkId={activeLinkId}
              onChangeActiveLink={debouncedChangeActiveLink}
            />
          </div>

          <CartIcon />
        </div>
      </nav>
    </>
  );
};
