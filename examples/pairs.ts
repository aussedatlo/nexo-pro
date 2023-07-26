import { config } from 'dotenv';
import Client from '../lib/';
import { PairsResponse } from '../lib/types/client';

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
