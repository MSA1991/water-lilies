type Props = {
  price: number;
  discount: number;
};

export const Price = ({ price, discount }: Props) => (
  <div className="flex gap-1.5 text-xl font-bold">
    Ціна:{' '}
    {discount > 0 ? (
      <div>
        {price - discount} грн
        <span className="ml-1.5 line-through opacity-50">{price} грн</span>
      </div>
    ) : (
      <div>{price} грн</div>
    )}
  </div>
);
