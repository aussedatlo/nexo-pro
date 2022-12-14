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

export class Client {
  private key: string;
  private secret: string;
  private baseUrl: string = BASE_URL_VERSION_API_V1;
  private requestConfig: AxiosRequestConfig;

  constructor(options: RestClientOptions) {
    this.key = options.api_key;
    this.secret = options.api_secret;
    this.requestConfig = {
      timeout: 1000 * 60 * 5,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'nodejs-nexo-pro',
        'Content-Type': 'application/json',
        'X-API-KEY': this.key,
      },
    };
  }

  public async _call(
    method: Method,
    endpoint: string,
    params?: any
  ): Promise<AxiosResponse<any>> {
    const nonce = Date.now();
    const { signature } = getSignature({}, this.secret, nonce.toString());

    const requestConfig = {
      ...this.requestConfig,
      headers: {
        'X-NONCE': nonce,
        'X-SIGNATURE': signature,
        ...this.requestConfig.headers,
      },
      url: [this.baseUrl, endpoint].join('/'),
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
  }

  public get(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('GET', endpoint, params);
  }

  public post(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('POST', endpoint, params);
  }

  public put(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('PUT', endpoint, params);
  }

  public delete(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('DELETE', endpoint, params);
  }

  public getAccountSummary(): Promise<AccountSummaryResponse> {
    return this.get('accountSummary');
  }

  public getPairs(): Promise<PairsResponse> {
    return this.get('pairs');
  }

  public getQuote(params: QuoteParams): Promise<QuoteResponse> {
    return this.get('quote', params);
  }

  public placeOrder(params: OrderParams): Promise<OrderResponse> {
    return this.post('orders', params);
  }

  public cancelOrder(params: CancelOrderParams): Promise<CancelOrderResponse> {
    return this.post('orders/cancel', params);
  }

  public cancelAllOrders(
    params: CancelAllOrdersParams
  ): Promise<CancelAllOrdersResponse> {
    return this.post('orders/cancel/all', params);
  }

  public placeTriggerOrder(
    params: TriggerOrderParams
  ): Promise<TriggerOrderResponse> {
    return this.post('orders/trigger', params);
  }

  public placeAdvancedOrder(
    params: TriggerOrderParams
  ): Promise<TriggerOrderResponse> {
    return this.post('orders/advanced', params);
  }

  public placeTWAPOrder(params: TWAPOrderParams): Promise<TWAPOrderResponse> {
    return this.post('orders/twap', params);
  }

  public getOrders(params: OrdersParams): Promise<OrdersResponse> {
    return this.get('orders', params);
  }

  public getOrderDetails(
    params: SpecificOrderParams
  ): Promise<SpecificOrderResponse> {
    return this.get('orderDetails', params);
  }

  public getTrades(params: TradesParams): Promise<TradesResponse> {
    return this.get('trades', params);
  }

  public getTransaction(
    params: TransactionParams
  ): Promise<TransactionResponse> {
    return this.get('transaction', params);
  }

  public getFuturesInstruments(): Promise<FuturesInstrumentsResponse> {
    return this.get('futures/instruments');
  }

  public getFuturesPosition(
    params: FuturesPositionsParams
  ): Promise<FuturesPositionResponse> {
    return this.get('futures/positions', params);
  }

  public placeFuturesOrder(
    params: FuturesOrderParams
  ): Promise<FuturesOrderResponse> {
    return this.post('futures/order', params);
  }
}
