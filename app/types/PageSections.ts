export const PageSectionsId = {
  Home: 'home',
  About: 'about',
  Catalog: 'catalog',
  Delivery: 'delivery',
  Faq: 'faq',
  Contacts: 'contacts',
} as const;

export type NavSections = Exclude<
  (typeof PageSectionsId)[keyof typeof PageSectionsId],
  typeof PageSectionsId.Home
>;

export type VisibleSection = NavSections | null;

export type SectionLink = {
  id: NavSections;
  label: string;
};
