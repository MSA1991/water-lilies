import { clsx } from 'clsx';
import { Loader } from './Loader';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
};

export const Button = ({ text, disabled, isLoading, ...props }: Props) => (
  <button
    disabled={disabled || isLoading}
    className={clsx('button', {
      'cursor-not-allowed opacity-70': disabled,
    })}
    {...props}
  >
    {isLoading ? <Loader /> : text}
  </button>
);
