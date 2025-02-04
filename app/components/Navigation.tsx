import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import * as m from 'motion/react-client';
import { ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { useCart } from '~/store/cart';
import { useDebounce } from '~/hooks/useDebounce';
import { PageSectionsId, SectionLinks } from '../types/PageSections';
import { AnimatePresence } from 'motion/react';

export const Navigation = () => {
  const [activeLinkId, setActiveLinkId] = useState<SectionLinks>(null);
  const toggleIsOpenCart = useCart.use.toggleIsOpen();
  const productsCart = useCart.use.products();

  const onChangeActiveLink = (id: SectionLinks) => {
    if (id === activeLinkId) return;

    setActiveLinkId(id);
  };

  const debouncedChangeActiveLink = useDebounce(onChangeActiveLink, 300);

  return (
    <nav className="container sticky inset-x-0 top-4 z-30 -mt-14 h-14 md:-mt-[72px] md:h-[72px]">
      <div className="border-box flex h-full items-center justify-between rounded-xl bg-secondary/50 p-2 px-2.5 shadow-2xl backdrop-blur-xl md:p-4">
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

        <div className="hidden md:block">
          <NavLinks
            activeLinkId={activeLinkId}
            onChangeActiveLink={debouncedChangeActiveLink}
          />
        </div>

        <div className="relative">
          <button type="button" className="block" onClick={toggleIsOpenCart}>
            <ShoppingBagIcon className="icon" />
          </button>

          <AnimatePresence>
            {!!productsCart.length && (
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{
                  scale: 0,
                  transition: { duration: 0.3, ease: 'easeInOut' },
                }}
                transition={{ type: 'spring' }}
                className="flex-center absolute -right-2 -top-2 h-5 w-5 rounded-full bg-secondary text-white"
              >
                {productsCart.length}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
