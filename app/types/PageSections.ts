export enum PageSectionsId {
  Home = 'home',
  About = 'about',
  Catalog = 'catalog',
  Delivery = 'delivery',
  Faq = 'faq',
  Contacts = 'contacts',
}

export type NavigationSections = Exclude<PageSectionsId, PageSectionsId.Home>;

export type PageSections = {
  id: NavigationSections;
  label: string;
};

export type SectionLinks = NavigationSections | null;
