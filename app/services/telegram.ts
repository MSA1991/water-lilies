import { getTotalPrice } from '~/helpers/getTotalPrice';
import { OrderFormData } from '~/types/OrderFormData';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID as string;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export const sendMessage = async (data: OrderFormData) => {
  const { firstName, lastName, phone, city, warehouse, cart } = data;

  const message = `--------Нове замовлення--------
    
Замовник:
Ім'я: ${firstName}
Прізвище: ${lastName}
Телефон: ${phone}

Доставка:
${city} ${warehouse}

Кошик:
${cart
  .map(
    ({ title, variant: { size, price, discount }, quantity }) =>
      `- ${title}
Рослина: ${size}
Кількість: ${quantity} шт.
Ціна: ${(price - discount) * quantity} грн.`,
  )
  .join('\n\n')}
  
Всього до сплати: ${getTotalPrice(cart)} грн.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) throw new Error();

    return response.ok;
  } catch (error) {
    return false;
  }
};
