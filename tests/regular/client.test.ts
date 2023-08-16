import axios from 'axios';
import { config } from 'dotenv';
import { URLSearchParams } from 'url';
import Client from '../../src/client';
import {
  AdvancedOrderParams,
  CancelAllOrdersParams,
  CancelOrderParams,
  FuturesOrderParams,
  FuturesPositionsParams,
  OrderParams,
  OrdersParams,
  QuoteParams,
  SpecificOrderParams,
  TWAPOrderParams,
  TradesParams,
  TransactionParams,
  TriggerOrderParams,
} from '../../src/types/client';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('Api calls endpoint', () => {
  config();
  const key = process.env.APIKEY || 'APIKEY';
  const secret = process.env.APISECRET || 'APISECRET';

  const client = Client({
    api_key: key,
    api_secret: secret,
  });

  beforeEach(() => {
    jest.resetAllMocks();
    mockedAxios.mockResolvedValue({} as any);
  });

  it('should call axios with correct parameters for getAccountSummary()', async () => {
    await client.getAccountSummary();
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/accountSummary$/),
      })
    );
  });

  it('should call axios with correct parameters for getPairs()', async () => {
    await client.getPairs();
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/pairs$/),
      })
    );
  });

  it('should call axios with correct parameters for getQuote()', async () => {
    const params: QuoteParams = { amount: 10, pair: 'BTC/EUR', side: 'buy' };
    const expectedParams = {
      amount: '10',
      pair: 'BTC/EUR',
      side: 'buy',
    };

    await client.getQuote(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/quote$/),
        params: new URLSearchParams(expectedParams),
      })
    );
  });

  it('should call axios with correct parameters for placeOrder()', async () => {
    const params: OrderParams = {
      pair: 'BTC/EUR',
      quantity: 42,
      side: 'buy',
      type: 'market',
    };

    await client.placeOrder(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringMatching(/\/orders$/),
        data: params,
      })
    );
  });

  it('should call axios with correct parameters for cancelOrder()', async () => {
    const params: CancelOrderParams = { orderId: 'order-id' };

    await client.cancelOrder(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringMatching(/\/orders\/cancel$/),
        data: params,
      })
    );
  });

  it('should call axios with correct parameters for cancelAllOrders()', async () => {
    const params: CancelAllOrdersParams = { pair: 'BTC/EUR' };

    await client.cancelAllOrders(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringMatching(/\/orders\/cancel\/all$/),
        data: params,
      })
    );
  });

  it('should call axios with correct parameters for placeTriggerOrder()', async () => {
    const params: TriggerOrderParams = {
      amount: 10,
      pair: 'BTC/EUR',
      side: 'buy',
      triggerPrice: 15,
      triggerType: 'stopLoss',
      trailingDistance: 10,
    };

    await client.placeTriggerOrder(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringMatching(/\/orders\/trigger$/),
        data: params,
      })
    );
  });

  it('should call axios with correct parameters for placeAdvancedOrder()', async () => {
    const params: AdvancedOrderParams = {
      amount: 10,
      pair: 'BTC/EUR',
      side: 'buy',
      stopLossPrice: 15,
      takeProfitPrice: 20,
    };

    await client.placeAdvancedOrder(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringMatching(/\/orders\/advanced$/),
        data: params,
      })
    );
  });

  it('should call axios with correct parameters for placeTWAPOrder()', async () => {
    const params: TWAPOrderParams = {
      exchanges: [''],
      executionInterval: 10,
      pair: 'BTC/EUR',
      quantity: 15,
      side: 'buy',
      split: 30,
    };

    await client.placeTWAPOrder(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringMatching(/\/orders\/twap$/),
        data: params,
      })
    );
  });

  it('should call axios with correct parameters for getOrders()', async () => {
    const params: OrdersParams = {
      endDate: 10,
      pageNum: 2,
      pageSize: 5,
      pairs: ['BTC/EUR', 'BTC/USDT'],
      startDate: 20,
    };
    const expectedParams = {
      endDate: '10',
      pageNum: '2',
      pageSize: '5',
      pairs: ['BTC/EUR', 'BTC/USDT'],
      startDate: '20',
    };

    await client.getOrders(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/orders$/),
        params: new URLSearchParams(expectedParams),
      })
    );
  });

  it('should call axios with correct parameters for getOrderDetails()', async () => {
    const params: SpecificOrderParams = {
      id: 'order-id',
    };

    await client.getOrderDetails(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/orderDetails$/),
        params: new URLSearchParams(params),
      })
    );
  });

  it('should call axios with correct parameters for getTrades()', async () => {
    const params: TradesParams = {
      endDate: 10,
      pageNum: 2,
      pageSize: 5,
      pairs: ['BTC/EUR', 'BTC/USDT'],
      startDate: 20,
    };
    const expectedParams = {
      endDate: '10',
      pageNum: '2',
      pageSize: '5',
      pairs: ['BTC/EUR', 'BTC/USDT'],
      startDate: '20',
    };

    await client.getTrades(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/trades$/),
        params: new URLSearchParams(expectedParams),
      })
    );
  });

  it('should call axios with correct parameters for getTransaction()', async () => {
    const params: TransactionParams = {
      transactionId: 42,
    };
    const expectedParams = {
      transactionId: '42',
    };

    await client.getTransaction(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/transaction$/),
        params: new URLSearchParams(expectedParams),
      })
    );
  });

  it('should call axios with correct parameters for getFuturesInstruments()', async () => {
    await client.getFuturesInstruments();
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/futures\/instruments$/),
        params: new URLSearchParams({}),
      })
    );
  });

  it('should call axios with correct parameters for getFuturesPosition()', async () => {
    const params: FuturesPositionsParams = {
      status: 'active',
    };

    await client.getFuturesPosition(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringMatching(/\/futures\/positions$/),
        params: new URLSearchParams(params),
      })
    );
  });

  it('should call axios with correct parameters for placeFuturesOrder()', async () => {
    const params: FuturesOrderParams = {
      instrument: '',
      positionAction: 'close',
      positionSide: 'long',
      quantity: 10,
      type: 'market',
    };

    await client.placeFuturesOrder(params);
    expect(mockedAxios).toBeCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringMatching(/\/futures\/order$/),
        data: params,
      })
    );
  });
});
