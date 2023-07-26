import { config } from 'dotenv';
import Client from '../src/client';
import { Instrument, Position } from '../src/types/client';

describe('Pairs Endpoint', () => {
  config();
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';

  const client = Client({
    api_key: key,
    api_secret: secret,
  });

  it('getFuturesInstruments()', async () => {
    const result = await client.getFuturesInstruments();
    expect(result).toMatchObject({
      instruments: expect.any(Array<Instrument>),
    });
  });

  it('getFuturesPosition()', async () => {
    const result = await client.getFuturesPosition({ status: 'any' });
    expect(result).toMatchObject({
      positions: expect.any(Array<Position>),
    });
  });
});
