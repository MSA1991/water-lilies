import { PageSectionsId } from '../types/PageSections';

export const Catalog = () => {
  return (
    <section
      className="container relative h-[1000px] text-2xl"
      id={PageSectionsId.Catalog}
    >
      <div className="absolute left-1/2 top-1/2 h-2/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow to-secondary-light blur-3xl"></div>
      <div>Products</div>
    </section>
  );
};
