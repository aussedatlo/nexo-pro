import Client from '@nexo-pro/index';
import { config } from 'dotenv';

config();
const key = process.env.APIKEY || 'APIKEY';
const secret = process.env.APISECRET || 'APISECRET';

const client = Client({
  api_key: key,
  api_secret: secret,
});

(async () => {
  try {
    const order = await client.placeOrder({
      pair: 'BTC/EUR',
      side: 'buy',
      type: 'limit',
      quantity: 0.0008,
      price: 18000,
    });
    console.log(order);

    await client.cancelOrder({ orderId: order.orderId });
  } catch (e) {
    console.log(e);
  }
})();
