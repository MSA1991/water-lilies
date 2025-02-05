import * as m from 'motion/react-client';

type Props = {
  isVisible: boolean;
  toggleIsVisible: () => void;
};

const variants = {
  visible: { opacity: 1, display: 'block' },
  hidden: { opacity: 0, display: 'none' },
};

export const Overlay = ({ isVisible, toggleIsVisible }: Props) => (
  <m.div
    initial={false}
    variants={variants}
    animate={isVisible ? 'visible' : 'hidden'}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-40 bg-black/50"
    onClick={toggleIsVisible}
  />
);
