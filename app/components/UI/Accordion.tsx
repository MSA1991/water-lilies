import * as m from 'motion/react-client';
import { clsx } from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type Props = {
  question: string;
  answer: string;
  isOpen: boolean;
};

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

export const Accordion = ({ question, answer, isOpen }: Props) => (
  <div className="border-box rounded-xl bg-secondary-light/50 p-4">
    <div className="flex items-center justify-between">
      <h4 className="text-lg font-bold lg:text-2xl">{question}</h4>

      <ChevronDownIcon
        className={clsx('icon transition-transform', {
          'rotate-180': isOpen,
        })}
      />
    </div>

    <m.div
      initial={false}
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <p className="whitespace-pre-wrap pt-4 text-left lg:text-xl">{answer}</p>
    </m.div>
  </div>
);
