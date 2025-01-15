import { PageSectionsId } from '../types/PageSections';

export const Footer = () => {
  return (
    <footer
      className="relative z-10 h-[500px] bg-secondary"
      id={PageSectionsId.Contacts}
    >
      <div className="container text-2xl">Footer</div>
    </footer>
  );
};
