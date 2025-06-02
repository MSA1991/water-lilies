import { OrderFormErrors, OrderFormData } from '~/types/OrderFormData';

export const getFormErrors = (formData: OrderFormData) => {
  const { firstName, lastName, phone, city, warehouse } = formData;
  const errors: OrderFormErrors = {};

  if (!firstName.trim()) errors.firstName = 'Введіть ім`я';
  if (!lastName.trim()) errors.lastName = 'Введіть прізвище';
  if (!phone || String(phone).includes('_')) errors.phone = 'Введіть номер';
  if (!city.trim()) errors.city = 'Введіть місто';
  if (!warehouse.trim()) errors.warehouse = 'Введіть відділення';

  return errors;
};
