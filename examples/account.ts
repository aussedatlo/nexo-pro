import Client from '@nexo-pro/index';
import { AccountSummaryResponse } from '@nexo-pro/types/client';
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
    const accountSummary: AccountSummaryResponse =
      await client.getAccountSummary();
    console.log(accountSummary);
  } catch (e) {
    console.log(e);
  }
})();
