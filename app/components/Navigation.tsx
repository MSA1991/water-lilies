import { lazy, Suspense, useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';
import { LuMenu } from 'react-icons/lu';
import { HiShoppingBag } from 'react-icons/hi2';

import { Logo } from './UI/Logo';
import { NavLinks } from './NavLinks';

import { useCart } from '~/store/cart';
import { useDebounce } from '~/hooks/useDebounce';
import { PageSectionsId, SectionLinks } from '../types/PageSections';

const Menu = lazy(() =>
  import('./Menu').then((module) => ({ default: module.Menu })),
);
const Cart = lazy(() =>
  import('./Cart').then((module) => ({ default: module.Cart })),
);

export const Navigation = () => {
  const [activeLinkId, setActiveLinkId] = useState<SectionLinks>(null);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const openCart = useCart.use.openCart();
  const productsCart = useCart.use.products();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleToggleMenu = () => {
    setIsOpenMenu((_isOpenMenu) => !_isOpenMenu);
  };

  const onChangeActiveLink = (id: SectionLinks) => {
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
            onClick={handleToggleMenu}
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

          <div className="relative">
            <button
              aria-label="відкрити кошик"
              type="button"
              className="block"
              onClick={openCart}
            >
              <HiShoppingBag className="icon-lg drop-shadow-white" />
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

      {isHydrated && (
        <>
          <Suspense fallback={null}>
            <Menu isOpen={isOpenMenu} onToggle={handleToggleMenu} />
          </Suspense>

          <Suspense fallback={null}>
            <Cart />
          </Suspense>
        </>
      )}
    </>
  );
};
