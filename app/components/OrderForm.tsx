import { useState } from 'react';
import { Form, useNavigation } from '@remix-run/react';
import InputMask from '@mona-health/react-input-mask';

import { Button } from './UI/Button';
import { SearchCities } from './SearchCities';
import { SearchWarehouses } from './SearchWarehouses';

import { useCart } from '~/store/cart';
import { OrderFormErrors } from '~/types/OrderFormData';

type Props = {
  formErrors?: OrderFormErrors;
};

export const OrderForm = ({ formErrors: FormErrors }: Props) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  const [searchedCityRef, setSearchedCityRef] = useState<string>('');
  const productsCart = useCart.use.products();

  const onChangeSearchedCity = (cityRef: string) => {
    setSearchedCityRef(cityRef);
  };

  return (
    <Form
      method="POST"
      className="flex flex-col gap-2 font-bold sm:text-lg md:gap-5 [&_span]:text-primary"
    >
      <label>
        Ім`я:{' '}
        {FormErrors?.firstName && <span>{`(${FormErrors.firstName})`}</span>}
        <input type="text" name="firstName" className="input" />
      </label>

      <label>
        Прізвище:{' '}
        {FormErrors?.lastName && <span>{`(${FormErrors.lastName})`}</span>}
        <input type="text" name="lastName" className="input" />
      </label>

      <label>
        Номер телефона:{' '}
        {FormErrors?.phone && <span>{`(${FormErrors.phone})`}</span>}
        <InputMask name="phone" mask="+38 (999) 999-99-99" className="input" />
      </label>

      <SearchCities
        onChangeSearchedCity={onChangeSearchedCity}
        error={FormErrors?.city}
      />

      <SearchWarehouses
        searchedCity={searchedCityRef}
        error={FormErrors?.warehouse}
      />

      <input type="hidden" name="cart" value={JSON.stringify(productsCart)} />

      <Button isLoading={isLoading} type="submit" text="замовити" />
    </Form>
  );
};
