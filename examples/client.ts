import { Client } from '../src/client';
import { config } from 'dotenv';

config();
const key = process.env.APIKEY || 'APIKEY';
const secret = process.env.APISECRET || 'APISECRET';

const client = new Client({
  api_key: key,
  api_secret: secret,
});

(async () => {
  try {
    const pairs = await client.getPairs();
    console.log(pairs);

    const accountSummary = await client.getAccountSummary();
    console.log(accountSummary);

    const quote1 = await client.getQuote({
      pair: 'BTC/USDT',
      amount: 100,
      side: 'buy',
    });
    console.log(quote1);

    const quote2 = await client.getQuote({
      pair: 'BTC/USDT',
      amount: 100,
      side: 'sell',
    });
    console.log(quote2);

    const order = await client.setOrder({
      pair: 'NEXO/USDT',
      side: 'buy',
      type: 'market',
      quantity: 1,
    });

    console.log(order);

    const history = await client.getOrders({
      pairs: ['BTC/USDT'],
      startDate: 0,
      endDate: Date.now(),
      pageSize: 5,
      pageNum: 0,
    });
    console.log(history);
  } catch (e) {
    console.log(e);
  }
})();
