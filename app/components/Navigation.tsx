import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { useDebounce } from '~/hooks/useDebounce';
import { PageSectionsId, SectionLinks } from '../types/PageSections';

export const Navigation = () => {
  const [activeLinkId, setActiveLinkId] = useState<SectionLinks>(null);

  const onChangeActiveLink = (id: SectionLinks) => {
    if (id === activeLinkId) return;

    setActiveLinkId(id);
  };

  const debouncedChangeActiveLink = useDebounce(onChangeActiveLink, 300);

  return (
    <nav className="container fixed inset-x-0 top-4 z-50">
      <div className="border-box flex items-center justify-between rounded-xl bg-secondary/50 p-2 shadow-2xl backdrop-blur-xl md:p-4">
        <button type="button" className="md:hidden">
          <Bars3Icon className="icon" />
        </button>

        <ScrollLink
          to={PageSectionsId.Home}
          smooth={true}
          spy={true}
          offset={0}
          duration={300}
          isDynamic={true}
          onSetActive={() => debouncedChangeActiveLink(null)}
          className="cursor-pointer"
        >
          <Logo />
        </ScrollLink>

        <NavLinks
          activeLinkId={activeLinkId}
          onChangeActiveLink={debouncedChangeActiveLink}
        />

        <button type="button">
          <ShoppingBagIcon className="icon" />
        </button>
      </div>
    </nav>
  );
};
