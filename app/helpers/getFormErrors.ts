import { OrderFormData } from '~/types/OrderFormData';

export const getFormErrors = (formData: OrderFormData) => {
  const { firstName, lastName, phone, city, warehouse } = formData;
  const errors: Record<string, string> = {};

  if (!firstName) errors.firstName = 'Введіть ім`я';
  if (!lastName) errors.lastName = 'Введіть прізвище';
  if (!phone || String(phone).includes('_')) errors.phone = 'Введіть номер';
  if (!city) errors.city = 'Введіть місто';
  if (!warehouse) errors.warehouse = 'Введіть відділення';

  return errors;
};
