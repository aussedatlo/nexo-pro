import Client from '@nexo-pro/client';
import { PairsResponse } from '@nexo-pro/types/client';
import { config } from 'dotenv';

describe('Pairs Endpoint', () => {
  config();
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';

  const client = Client({
    api_key: key,
    api_secret: secret,
  });

  it('getPairs()', async () => {
    const result: PairsResponse = await client.getPairs();
    expect(result).toMatchObject({
      pairs: expect.any(Array),
      min_limits: expect.any(Object),
      max_limits: expect.any(Object),
    });
  });
});
