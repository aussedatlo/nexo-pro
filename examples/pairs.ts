import { PairsResponse } from '@nexo-pro//types/client';
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
    const pairs: PairsResponse = await client.getPairs();
    console.log(pairs);
  } catch (e) {
    console.log(e);
  }
})();
