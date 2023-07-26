import { config } from 'dotenv';
import Client from '../src/client';
import { QuoteParams, QuoteResponse } from '../src/types/client';

describe('Quote Endpoint', () => {
  config();
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';

  const pair = 'BTC/USDT';

  const client = Client({
    api_key: key,
    api_secret: secret,
  });

  it('getQuote()', async () => {
    const params: QuoteParams = { pair: pair, amount: 100, side: 'sell' };
    const result: QuoteResponse = await client.getQuote(params);
    expect(result).toMatchObject({
      pair: expect.any(String),
      amount: expect.any(String),
      price: expect.any(String),
      timestamp: expect.any(String),
    });
    expect(Number(result.amount)).not.toBeNaN();
    expect(Number(result.price)).not.toBeNaN();
    expect(Number(result.timestamp)).not.toBeNaN();
  });
});
