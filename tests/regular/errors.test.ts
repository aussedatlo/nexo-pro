import Client from '@nexo-pro/client';
import { ApiError, HttpError } from '@nexo-pro/constant/errors';
import axios from 'axios';
import { config } from 'dotenv';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('errors', () => {
  config();
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';

  const client = Client({
    api_key: key,
    api_secret: secret,
  });

  it('should throw HttpError on unsuccessful request without error message', async () => {
    const response = {
      response: {
        status: 404,
        data: 'Not Found',
      },
    };
    mockedAxios.mockRejectedValue(response);

    await expect(client.getPairs()).rejects.toThrow(HttpError);
  });

  it('should throw ApiError on unsuccessful request with error message', async () => {
    const response = {
      response: {
        status: 400,
        data: { errorCode: 101, errorMessage: 'Invalid signature' },
      },
    };
    mockedAxios.mockRejectedValue(response);

    try {
      await client.getPairs();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toBe('Invalid signature');
      expect(error.getErrorCode()).toBe(101);
    }
  });

  it('should throw error on unexpected response structure', async () => {
    const response = { response: { status: 500 } };
    mockedAxios.mockRejectedValue(response);

    await expect(client.getPairs()).rejects.toThrow('undefined error');
  });
});
