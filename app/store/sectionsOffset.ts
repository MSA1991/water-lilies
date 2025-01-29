import { create } from 'zustand';
import { createSelectors } from '~/utils/createSelectors';

type SectionsOffsetStore = {
  sectionOffset: number;
  footerOffset: number;
  setSectionOffset: (offset: number) => void;
  setFooterOffset: (offset: number) => void;
};

const sectionsOffsetStore = create<SectionsOffsetStore>((set) => ({
  sectionOffset: 0,
  footerOffset: 0,
  setSectionOffset: (offset) => set({ sectionOffset: offset }),
  setFooterOffset: (offset) => set({ footerOffset: offset }),
}));

export const useSectionsOffset = createSelectors(sectionsOffsetStore);
