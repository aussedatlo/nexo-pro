export type NexoProClientOptions = {
  api_key: string;
  api_secret: string;
};

export type NexoProClient = {
  getAccountSummary: GetAccountSummaryFn;
  getPairs: GetPairsFn;
  getQuote: GetQuoteFn;
  placeOrder: PlaceOrderFn;
  cancelOrder: CancelOrderFn;
  cancelAllOrders: CancelAllOrdersFn;
  placeTriggerOrder: PlaceTriggerOrderFn;
  placeAdvancedOrder: PlaceAdvancedOrderFn;
  placeTWAPOrder: PlaceTWAPOrderFn;
  getOrders: GetOrdersFn;
  getOrderDetails: GetOrderDetailsFn;
  getTrades: GetTradesFn;
  getTransaction: GetTransactionFn;
  getFuturesInstruments: GetFuturesInstrumentsFn;
  getFuturesPosition: GetFuturesPositionFn;
  placeFuturesOrder: PlaceFututuresOrderFn;
};

export type GetAccountSummaryFn = () => Promise<AccountSummaryResponse>;

export type GetPairsFn = () => Promise<PairsResponse>;

export type GetQuoteFn = (params: QuoteParams) => Promise<QuoteResponse>;

export type PlaceOrderFn = (params: OrderParams) => Promise<OrderResponse>;

export type CancelOrderFn = (
  params: CancelOrderParams
) => Promise<CancelOrderResponse>;

export type CancelAllOrdersFn = (
  params: CancelAllOrdersParams
) => Promise<CancelAllOrdersResponse>;

export type PlaceTriggerOrderFn = (
  params: TriggerOrderParams
) => Promise<TriggerOrderResponse>;

export type PlaceAdvancedOrderFn = (
  params: TriggerOrderParams
) => Promise<TriggerOrderResponse>;

export type PlaceTWAPOrderFn = (
  params: TWAPOrderParams
) => Promise<TWAPOrderResponse>;

export type GetOrdersFn = (params: OrdersParams) => Promise<OrdersResponse>;

export type GetOrderDetailsFn = (
  params: SpecificOrderParams
) => Promise<SpecificOrderResponse>;

export type GetTradesFn = (params: TradesParams) => Promise<TradesResponse>;

export type GetTransactionFn = (
  params: TransactionParams
) => Promise<TransactionResponse>;

export type GetFuturesInstrumentsFn = () => Promise<FuturesInstrumentsResponse>;

export type GetFuturesPositionFn = (
  params: FuturesPositionsParams
) => Promise<FuturesPositionResponse>;

export type PlaceFututuresOrderFn = (
  params: FuturesOrderParams
) => Promise<FuturesOrderResponse>;

export type AccountSummaryResponse = {
  balances: Array<Balance>;
};

export type Balance = {
  assetName: string;
  totalBalance: number;
  availableBalance: number;
  lockedBalance: number;
  debt: number;
  intereset: number;
};

export type PairsResponse = {
  pairs: Array<string>;
  min_limits: { [pair: string]: number | null };
  max_limits: { [pair: string]: number | null };
};

export type QuoteResponse = {
  pair: string;
  amount: number;
  price: number;
  timestamp: number;
};

export type Side = 'buy' | 'sell';
export type Type = 'market' | 'limit';
export type TriggerType = 'stopLoss' | 'takeProfit' | 'trailing';
export type Status = 'completed';
export type TransactionType = 'deposit' | 'withdraw';
export type FuturesStatus = 'any' | 'active' | 'inactive';
export type FuturesSide = 'long' | 'short';
export type FuturesAction = 'open' | 'close';

export type QuoteParams = {
  pair: string;
  amount: number;
  side: Side;
  exchanges?: string;
};

export type OrderParams = {
  pair: string;
  side: Side;
  type: Type;
  quantity: number;
  price?: number; // only for limit order
};

export type OrderResponse = {
  orderId: string;
};

export type CancelOrderParams = {
  orderId: string;
};

export type CancelOrderResponse = {};

export type CancelAllOrdersParams = {
  pair: string;
};

export type CancelAllOrdersResponse = {};

export type TriggerOrderParams = {
  pair: string;
  side: Side;
  triggerType: TriggerType;
  amount: number;
  triggerPrice: number;
  trailingDistance?: number;
  trailingPercentage?: number;
};

export type TriggerOrderResponse = {
  id: string;
};

export type AdvancedOrderParams = {
  pair: string;
  side: Side;
  amount: number;
  stopLossPrice: number;
  takeProfitPrice: number;
};

export type AdvancedOrderResponse = {
  id: string;
};

export type TWAPOrderParams = {
  pair: string;
  side: Side;
  quantity: number;
  exchanges: Array<string>;
  split: number;
  executionInterval: number;
};

export type TWAPOrderResponse = {
  dealID: string;
  amount: number;
};

export type Order = {
  id: string;
  side: Side;
  pair: string;
  timestamp: number;
  quantity: number;
  exchangeRate: number;
  executedQuantity: number;
  tradeFee: number | null;
  feeAsset: number | null;
};

export type OrdersParams = {
  pairs: Array<string>;
  startDate: number;
  endDate: number;
  pageSize: number;
  pageNum: number;
};

export type OrdersResponse = {
  orders: Array<Order>;
};

export type SpecificOrderParams = {
  id: string;
};

export type OrderTrade = {
  id: string;
  symbol: string;
  type: Type;
  orderAmount: string;
  amountFilled: string;
  executedPrice: string;
  timestamp: number;
  status: Status;
};

export type SpecificOrderResponse = {
  id: string;
  side: Side;
  pair: string;
  timestamp: number;
  quantity: string;
  exchangeRate: string;
  executedQuantity: string;
  trades: Array<OrderTrade>;
};

export type TradesParams = {
  pairs: Array<string>;
  startDate: number;
  endDate: number;
  pageSize: number;
  pageNum: number;
};

export type Trade = {
  id: string;
  symbol: string;
  side: Side;
  tradeAmout: number;
  executedPrice: number;
  timestamp: number;
  orderId: string;
};

export type TradesResponse = {
  trades: Array<Trade>;
};

export type TransactionParams = {
  transactionId: number;
};

export type TransactionResponse = {
  transactionId: number;
  createDate: string;
  assetName: string;
  amount: number;
  type: TransactionType;
  status: Status;
};

export type Instrument = {
  name: string;
  pricePrecision: number;
  amountPrecision: number;
};

export type FuturesInstrumentsResponse = {
  instruments: Array<Instrument>;
};

export type FuturesPositionsParams = {
  status: FuturesStatus;
};

export type Position = {
  id: number;
  instrument: string;
  side: string;
  amount: number;
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  unrealizedPnl: number;
  lockedCollateral: number;
  leverage: number;
  created: string;
  updated: string;
  isPositionActive: boolean;
};

export type FuturesPositionResponse = {
  positions: Array<Position>;
};

export type FuturesOrderParams = {
  instrument: string;
  positionAction: FuturesAction;
  positionSide: FuturesSide;
  type: 'market';
  quantity: number;
};

export type FuturesOrderResponse = {
  id: string;
};
