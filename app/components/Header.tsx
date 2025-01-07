import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="relative h-[900px] overflow-x-hidden">
      <div className="absolute left-0 top-0 aspect-square w-3/4 min-w-96 -translate-x-1/3 -translate-y-1/4 rounded-full bg-secondary-light blur-3xl md:-translate-y-2/4 lg:-translate-y-3/4"></div>
      <div className="absolute right-0 top-0 h-3/5 w-2/4 -translate-y-1/4 translate-x-1/4 rotate-[20deg] rounded-full bg-gradient-to-r from-secondary-light from-30% to-yellow blur-3xl"></div>

      <div className="fixed left-4 right-4 top-4 z-10 mx-auto flex max-w-screen-xl items-center justify-between rounded-full border-2 border-secondary bg-secondary/20 px-8 py-4 shadow-xl backdrop-blur-sm">
        <Logo />

        <Navigation />

        <ShoppingBagIcon className="h-8 w-8 text-primary transition-colors hover:text-primary-light" />
      </div>
    </header>
  );
};
