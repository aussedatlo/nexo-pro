import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { BASE_URL_VERSION_API_V1 } from './constant/api';
import {
  AccountSummaryResponse,
  OrdersParams,
  OrdersResponse,
  OrderParams,
  OrderResponse,
  PairsResponse,
  QuoteParams,
  QuoteResponse,
  RestClientOptions,
  SpecificOrderParams,
  SpecificOrderResponse,
  TriggerOrderParams,
  TriggerOrderResponse,
  TWAPOrderParams,
  TWAPOrderResponse,
  TradesParams,
  TradesResponse,
  TransactionParams,
  TransactionResponse,
  CancelOrderParams,
  CancelOrderResponse,
  CancelAllOrdersParams,
  CancelAllOrdersResponse,
  FuturesPositionsParams,
  FuturesPositionResponse,
  FuturesInstrumentsResponse,
  FuturesOrderParams,
  FuturesOrderResponse,
} from './types/client';
import { getSignature } from './utils/rest';

type GenericAPIResponse<T = any> = Promise<T>;

const Client = ({ api_key, api_secret }: RestClientOptions) => {
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

  const call = (
    method: Method,
    endpoint: string,
    params?: any
  ): Promise<AxiosResponse<any>> => {
    const nonce = Date.now();
    const { signature } = getSignature({}, api_secret, nonce.toString());

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

    return axios(requestConfig)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }

        throw response;
      })
      .catch((e) => console.error(e));
  };

  const get = (endpoint: string, params?: any): GenericAPIResponse => {
    return call('GET', endpoint, params);
  };

  const post = (endpoint: string, params?: any): GenericAPIResponse => {
    return call('POST', endpoint, params);
  };

  const put = (endpoint: string, params?: any): GenericAPIResponse => {
    return call('PUT', endpoint, params);
  };

  const del = (endpoint: string, params?: any): GenericAPIResponse => {
    return call('DELETE', endpoint, params);
  };

  const getAccountSummary = (): Promise<AccountSummaryResponse> => {
    return get('accountSummary');
  };

  const getPairs = (): Promise<PairsResponse> => {
    return get('pairs');
  };

  const getQuote = (params: QuoteParams): Promise<QuoteResponse> => {
    return get('quote', params);
  };

  const placeOrder = (params: OrderParams): Promise<OrderResponse> => {
    return post('orders', params);
  };

  const cancelOrder = (
    params: CancelOrderParams
  ): Promise<CancelOrderResponse> => {
    return post('orders/cancel', params);
  };

  const cancelAllOrders = (
    params: CancelAllOrdersParams
  ): Promise<CancelAllOrdersResponse> => {
    return post('orders/cancel/all', params);
  };

  const placeTriggerOrder = (
    params: TriggerOrderParams
  ): Promise<TriggerOrderResponse> => {
    return post('orders/trigger', params);
  };

  const placeAdvancedOrder = (
    params: TriggerOrderParams
  ): Promise<TriggerOrderResponse> => {
    return post('orders/advanced', params);
  };

  const placeTWAPOrder = (
    params: TWAPOrderParams
  ): Promise<TWAPOrderResponse> => {
    return post('orders/twap', params);
  };

  const getOrders = (params: OrdersParams): Promise<OrdersResponse> => {
    return get('orders', params);
  };

  const getOrderDetails = (
    params: SpecificOrderParams
  ): Promise<SpecificOrderResponse> => {
    return get('orderDetails', params);
  };

  const getTrades = (params: TradesParams): Promise<TradesResponse> => {
    return get('trades', params);
  };

  const getTransaction = (
    params: TransactionParams
  ): Promise<TransactionResponse> => {
    return get('transaction', params);
  };

  const getFuturesInstruments = (): Promise<FuturesInstrumentsResponse> => {
    return get('futures/instruments');
  };

  const getFuturesPosition = (
    params: FuturesPositionsParams
  ): Promise<FuturesPositionResponse> => {
    return get('futures/positions', params);
  };

  const placeFuturesOrder = (
    params: FuturesOrderParams
  ): Promise<FuturesOrderResponse> => {
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
