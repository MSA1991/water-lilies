export enum PageSectionsId {
  Home = 'home',
  About = 'about',
  Catalog = 'catalog',
  Delivery = 'delivery',
  Faq = 'faq',
  Contacts = 'contacts',
}

export type PageSections = {
  id: PageSectionsId;
  label: string;
};
