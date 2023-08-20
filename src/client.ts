import axios, { AxiosRequestConfig, Method } from 'axios';
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

type ExtractParams<F> = F extends (
  params: infer P extends object
) => Promise<unknown>
  ? P
  : never;
type ExtractResponse<F> = F extends (params: unknown) => Promise<infer R>
  ? R
  : never;

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

  const call = async <P extends object, R>(
    method: Method,
    endpoint: string,
    params: P
  ): Promise<R> => {
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
      const p = new URLSearchParams();
      Object.keys(params).forEach((value: string) => {
        p.append(value, params[value]);
      });
      requestConfig.params = p;
    } else {
      requestConfig.data = params;
    }

    try {
      const { data } = await axios(requestConfig);
      return data as R;
    } catch (error) {
      if (!error.response || !error.response.data)
        throw new Error('undefined error');

      const { errorMessage, errorCode } = error.response.data;

      if (errorMessage && errorCode)
        throw new ApiError(errorMessage, error.response.status, errorCode);

      throw new HttpError(error.response.data, error.response.status);
    }
  };

  const get = <F>(endpoint: string, params: ExtractParams<F>) => {
    return call<ExtractParams<F>, ExtractResponse<F>>('GET', endpoint, params);
  };

  const post = <F>(endpoint: string, params: ExtractParams<F>) => {
    return call<ExtractParams<F>, ExtractResponse<F>>('POST', endpoint, params);
  };

  const getAccountSummary: GetAccountSummaryFn = () => {
    return get<GetAccountSummaryFn>('accountSummary', {});
  };

  const getPairs: GetPairsFn = () => {
    return get<GetPairsFn>('pairs', {});
  };

  const getQuote: GetQuoteFn = (params) => {
    return get<GetQuoteFn>('quote', params);
  };

  const placeOrder: PlaceOrderFn = (params) => {
    return post<PlaceOrderFn>('orders', params);
  };

  const cancelOrder: CancelOrderFn = (params) => {
    return post<CancelOrderFn>('orders/cancel', params);
  };

  const cancelAllOrders: CancelAllOrdersFn = (params) => {
    return post<CancelAllOrdersFn>('orders/cancel/all', params);
  };

  const placeTriggerOrder: PlaceTriggerOrderFn = (params) => {
    return post<PlaceTriggerOrderFn>('orders/trigger', params);
  };

  const placeAdvancedOrder: PlaceAdvancedOrderFn = (params) => {
    return post<PlaceAdvancedOrderFn>('orders/advanced', params);
  };

  const placeTWAPOrder: PlaceTWAPOrderFn = (params) => {
    return post<PlaceTWAPOrderFn>('orders/twap', params);
  };

  const getOrders: GetOrdersFn = (params) => {
    return get<GetOrdersFn>('orders', params);
  };

  const getOrderDetails: GetOrderDetailsFn = (params) => {
    return get<GetOrderDetailsFn>('orderDetails', params);
  };

  const getTrades: GetTradesFn = (params) => {
    return get<GetTradesFn>('trades', params);
  };

  const getTransaction: GetTransactionFn = (params) => {
    return get<GetTransactionFn>('transaction', params);
  };

  const getFuturesInstruments: GetFuturesInstrumentsFn = () => {
    return get<GetFuturesInstrumentsFn>('futures/instruments', {});
  };

  const getFuturesPosition: GetFuturesPositionFn = (params) => {
    return get<GetFuturesPositionFn>('futures/positions', params);
  };

  const placeFuturesOrder: PlaceFututuresOrderFn = (params) => {
    return post<PlaceFututuresOrderFn>('futures/order', params);
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
