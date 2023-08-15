import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { BASE_URL_VERSION_API_V1 } from './constant/api';
import { ApiError, HttpError } from './constant/errors';
import {
  CancelAllOrdersFn,
  CancelOrderFn,
  GetAccountSummaryFn,
  GetFuturesInstrumentsFn,
  GetFuturesPositionFn,
  GetOrderDetailsFn,
  GetOrdersFn,
  GetPairsFn,
  GetQuoteFn,
  GetTradesFn,
  GetTransactionFn,
  NexoProClient,
  NexoProClientOptions,
  PlaceAdvancedOrderFn,
  PlaceFututuresOrderFn,
  PlaceOrderFn,
  PlaceTWAPOrderFn,
  PlaceTriggerOrderFn,
} from './types/client';
import { getSignature } from './utils/rest';

type GenericAPIResponse<T = any> = Promise<T>;

const Client = ({
  api_key,
  api_secret,
}: NexoProClientOptions): NexoProClient => {
  const baseUrl: string = BASE_URL_VERSION_API_V1;
  const requestConfigDefault: AxiosRequestConfig = {
    timeout: 1000 * 60 * 5,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'nodejs-nexo-pro',
      'Content-Type': 'application/json',
      'X-API-KEY': api_key,
    },
  };

  const call = async (
    method: Method,
    endpoint: string,
    params?: any
  ): Promise<AxiosResponse<any>> => {
    const nonce = Date.now();
    const signature = getSignature(api_secret, nonce.toString());

    const requestConfig = {
      ...requestConfigDefault,
      headers: {
        'X-NONCE': nonce,
        'X-SIGNATURE': signature,
        ...requestConfigDefault.headers,
      },
      url: [baseUrl, endpoint].join('/'),
      method: method,
      json: true,
    };

    if (method === 'GET' || method === 'DELETE') {
      let p = new URLSearchParams();
      Object.keys(params || {}).forEach((value: string) => {
        p.append(value, params[value]);
      });
      requestConfig.params = p;
    } else {
      requestConfig.data = params;
    }

    try {
      return (await axios(requestConfig)).data;
    } catch (error) {
      if (!error.response || !error.response.data)
        throw new Error('undefined error');

      const { errorMessage, errorCode } = error.response.data;

      if (errorMessage && errorCode)
        throw new ApiError(errorMessage, error.response.status, errorCode);

      throw new HttpError(error.response.data, error.response.status);
    }
  };

  const get = (endpoint: string, params?: any): GenericAPIResponse => {
    return call('GET', endpoint, params);
  };

  const post = (endpoint: string, params?: any): GenericAPIResponse => {
    return call('POST', endpoint, params);
  };

  const getAccountSummary: GetAccountSummaryFn = () => {
    return get('accountSummary');
  };

  const getPairs: GetPairsFn = () => {
    return get('pairs');
  };

  const getQuote: GetQuoteFn = (params) => {
    return get('quote', params);
  };

  const placeOrder: PlaceOrderFn = (params) => {
    return post('orders', params);
  };

  const cancelOrder: CancelOrderFn = (params) => {
    return post('orders/cancel', params);
  };

  const cancelAllOrders: CancelAllOrdersFn = (params) => {
    return post('orders/cancel/all', params);
  };

  const placeTriggerOrder: PlaceTriggerOrderFn = (params) => {
    return post('orders/trigger', params);
  };

  const placeAdvancedOrder: PlaceAdvancedOrderFn = (params) => {
    return post('orders/advanced', params);
  };

  const placeTWAPOrder: PlaceTWAPOrderFn = (params) => {
    return post('orders/twap', params);
  };

  const getOrders: GetOrdersFn = (params) => {
    return get('orders', params);
  };

  const getOrderDetails: GetOrderDetailsFn = (params) => {
    return get('orderDetails', params);
  };

  const getTrades: GetTradesFn = (params) => {
    return get('trades', params);
  };

  const getTransaction: GetTransactionFn = (params) => {
    return get('transaction', params);
  };

  const getFuturesInstruments: GetFuturesInstrumentsFn = () => {
    return get('futures/instruments');
  };

  const getFuturesPosition: GetFuturesPositionFn = (params) => {
    return get('futures/positions', params);
  };

  const placeFuturesOrder: PlaceFututuresOrderFn = (params) => {
    return post('futures/order', params);
  };

  return {
    getAccountSummary,
    getPairs,
    getQuote,
    placeOrder,
    cancelOrder,
    cancelAllOrders,
    placeTriggerOrder,
    placeAdvancedOrder,
    placeTWAPOrder,
    getOrders,
    getOrderDetails,
    getTrades,
    getTransaction,
    getFuturesInstruments,
    getFuturesPosition,
    placeFuturesOrder,
  };
};

export default Client;
