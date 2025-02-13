import { CartProduct } from './Product';

export type OrderFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  warehouse: string;
  cart: CartProduct[];
};

export type OrderFormResponse = {
  success: boolean;
  errors?: Record<string, string>;
};
