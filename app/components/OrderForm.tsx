import { useState } from 'react';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import InputMask from '@mona-health/react-input-mask';
import { SearchCities } from './SearchCities';
import { SearchWarehouses } from './SearchWarehouses';
import { Button } from './Button';
import { useCart } from '~/store/cart';
import { OrderFormResponse } from '~/types/OrderFormData';

export const OrderForm = () => {
  const actionData = useActionData<OrderFormResponse>();

  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  const [searchedCityRef, setSearchedCityRef] = useState<string>('');
  const productsCart = useCart.use.products();

  const onChangeSearchedCity = (cityRef: string) => {
    setSearchedCityRef(cityRef);
  };

  return (
    <Form method="post" className="flex flex-col gap-5 font-bold sm:text-lg">
      <label>
        Ім`я:{' '}
        {actionData?.errors?.firstName && (
          <span className="text-primary">{`(${actionData.errors.firstName})`}</span>
        )}
        <input type="text" name="firstName" className="input" />
      </label>

      <label>
        Прізвище:{' '}
        {actionData?.errors?.lastName && (
          <span className="text-primary">{`(${actionData.errors.lastName})`}</span>
        )}
        <input type="text" name="lastName" className="input" />
      </label>

      <label>
        Номер телефона:{' '}
        {actionData?.errors?.phone && (
          <span className="text-primary">{`(${actionData.errors.phone})`}</span>
        )}
        <InputMask name="phone" mask="+38 (999) 999-99-99" className="input" />
      </label>

      <SearchCities
        onChangeSearchedCity={onChangeSearchedCity}
        error={actionData?.errors?.city}
      />

      <SearchWarehouses
        searchedCity={searchedCityRef}
        error={actionData?.errors?.warehouse}
      />

      <input type="hidden" name="cart" value={JSON.stringify(productsCart)} />

      <Button
        disabled={isLoading}
        type="submit"
        text={isLoading ? 'завантаження' : 'замовити'}
      />
    </Form>
  );
};
