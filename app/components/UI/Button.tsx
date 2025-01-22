import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
};

export const Button = ({ text, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'grid h-11 w-full place-items-center rounded-lg bg-primary shadow-xl',
        'text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-primary-light hover:tracking-widest',
        {
          'cursor-not-allowed opacity-70': disabled,
        },
      )}
    >
      {text}
    </button>
  );
};
