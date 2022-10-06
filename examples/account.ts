import { config } from 'dotenv';
import { Client } from '../lib/';
import { AccountSummaryResponse } from '../lib/types/client';

config();
const key = process.env.APIKEY || 'APIKEY';
const secret = process.env.APISECRET || 'APISECRET';

const client = new Client({
  api_key: key,
  api_secret: secret,
});

(async () => {
  try {
    const accountSummary: AccountSummaryResponse =
      await client.getAccountSummary();
    console.log(accountSummary);
  } catch (e) {
    console.log(e);
  }
})();
