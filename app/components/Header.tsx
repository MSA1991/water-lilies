import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

import flower from "../assets/images/flower.webp";
import leaf from "../assets/images/leaf.webp";
import { Button } from "./Button";

export const Header = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute left-0 top-0 -z-10 aspect-square w-3/4 min-w-96 -translate-x-1/3 -translate-y-1/4 rounded-full bg-secondary-light blur-3xl md:-translate-y-2/4 lg:-translate-y-3/4"></div>
      <div className="absolute right-0 top-0 h-3/5 w-2/4 -translate-y-1/4 translate-x-1/4 rotate-[20deg] rounded-full bg-gradient-to-r from-secondary-light from-30% to-yellow blur-3xl"></div>

      <div className="container fixed inset-x-0 top-4 z-50">
        <div className="flex items-center justify-between rounded-full border-2 border-secondary bg-secondary/20 px-8 py-4 shadow-xl backdrop-blur-xl">
          <Logo />

          <Navigation />

          <ShoppingBagIcon className="h-8 w-8 text-primary transition-colors hover:text-primary-light" />
        </div>
      </div>

      <div className="container mt-48 flex items-center justify-between gap-5">
        <div className="font-bold">
          <h1 className="text-7xl">Водяні лілії</h1>

          <p className="my-10 text-3xl">Cтиль і гармонія для вашої водойми</p>

          <Button type="button" text="замовити" />
        </div>

        <div className="relative col-span-4 col-start-2 max-w-[700px]">
          <img src={flower} alt="flower" className="absolute left-0 top-0" />
          <img src={leaf} alt="leaf" />
        </div>
      </div>
    </header>
  );
};
