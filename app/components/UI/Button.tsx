import { clsx } from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
};

export const Button = ({ text, disabled }: Props) => (
  <button
    disabled={disabled}
    className={clsx('button', {
      'cursor-not-allowed opacity-70': disabled,
    })}
  >
    {text}
  </button>
);
