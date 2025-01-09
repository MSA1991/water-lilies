type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button = ({ text }: Props) => {
  return (
    <button className="grid h-14 w-52 place-items-center rounded-full bg-primary font-bold uppercase text-white transition-colors hover:bg-primary-light">
      {text}
    </button>
  );
};
