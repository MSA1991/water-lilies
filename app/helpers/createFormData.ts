import { OrderFormData } from '~/types/OrderFormData';
import { CartProduct } from '~/types/Product';

export const createFormData = (formData: FormData): OrderFormData => ({
  firstName: formData.get('firstName') as string,
  lastName: formData.get('lastName') as string,
  phone: formData.get('phone') as string,
  city: formData.get('city') as string,
  warehouse: formData.get('warehouse') as string,
  cart: JSON.parse(String(formData.get('cart'))) as CartProduct[],
});
