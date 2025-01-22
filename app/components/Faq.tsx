import { useState } from 'react';
import { PageSectionsId } from '../types/PageSections';
import clsx from 'clsx';
import { Accordion } from './UI/Accordion';
import { FAQ } from '~/data/faq';

export const Faq = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const handleChangeOpenQuestion = (id: number) => {
    const questionId = id === openQuestionId ? null : id;

    setOpenQuestionId(questionId);
  };

  return (
    <section className="relative overflow-hidden" id={PageSectionsId.Faq}>
      <div
        className={clsx(
          'absolute bottom-0 right-0 aspect-square h-full w-1/3 min-w-56 translate-x-1/4 translate-y-1/4 -rotate-12 rounded-full',
          '-z-10 bg-gradient-to-r from-secondary-light from-30% to-yellow blur-3xl',
        )}
      ></div>
      <div
        className={clsx(
          'absolute left-0 top-0 -z-10 aspect-video w-1/3 min-w-56 rounded-full',
          '-translate-x-1/4 translate-y-1/3 bg-secondary-light blur-3xl',
        )}
      ></div>

      <div className="section-py container">
        <h2 className="section-title title-mb text-center">Часті запитання</h2>

        <ul className="container-sm flex flex-col gap-4">
          {FAQ.map(({ id, question, answer }) => {
            const isOpenQuestion = id === openQuestionId;

            return (
              <li key={id}>
                <button
                  className="w-full"
                  onClick={() => handleChangeOpenQuestion(id)}
                >
                  <Accordion
                    question={question}
                    answer={answer}
                    isOpen={isOpenQuestion}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
