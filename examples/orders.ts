import { config } from 'dotenv';
import Client from '../lib/';
import { OrderResponse, OrdersResponse } from '../lib/types/client';

config();
const key = process.env.APIKEY || 'APIKEY';
const secret = process.env.APISECRET || 'APISECRET';

const client = Client({
  api_key: key,
  api_secret: secret,
});

(async () => {
  try {
    const order: OrderResponse = await client.placeOrder({
      pair: 'BTC/USDC',
      side: 'buy',
      type: 'market',
      quantity: 100,
    });
    console.log(order);

    const orders: OrdersResponse = await client.getOrders({
      pairs: ['BTC/USDC', 'BTC/USDT'],
      startDate: 0,
      endDate: Date.now(),
      pageSize: 3,
      pageNum: 0,
    });
    console.log(orders);
  } catch (e) {
    console.log(e);
  }
})();
