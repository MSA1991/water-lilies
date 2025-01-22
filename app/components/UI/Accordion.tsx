import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  question: string;
  answer: string;
  isOpen: boolean;
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

    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="whitespace-pre-wrap pt-4 text-left lg:text-xl">
            {answer}
          </p>
        </m.div>
      )}
    </AnimatePresence>
  </div>
);
