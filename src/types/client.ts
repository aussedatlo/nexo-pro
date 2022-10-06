export interface RestClientOptions {
  api_key: string;
  api_secret: string;
}

export interface AccountSummaryResponse {
  balances: Array<Balance>;
}

export interface Balance {
  assetName: string;
  totalBalance: number;
  availableBalance: number;
  lockedBalance: number;
  debt: number;
  intereset: number;
}

export interface PairsResponse {
  pairs: Array<string>;
  min_limits: { [pair: string]: number | null };
  max_limits: { [pair: string]: number | null };
}

export interface QuoteResponse {
  pair: string;
  amount: number;
  price: number;
  timestamp: number;
}

export type Side = 'buy' | 'sell';
export type Type = 'market' | 'limit';
export type TriggerType = 'stopLoss' | 'takeProfit' | 'trailing';
export type Status = 'completed';
export type TransactionType = 'deposit' | 'withdraw';
export type FuturesStatus = 'any' | 'active' | 'inactive';
export type FuturesSide = 'long' | 'short';
export type FuturesAction = 'open' | 'close';

export interface QuoteParams {
  pair: string;
  amount: number;
  side: Side;
  exchanges?: string;
}

export interface OrderParams {
  pair: string;
  side: Side;
  type: Type;
  quantity: number;
  price?: number; // only for limit order
}

export interface OrderResponse {
  orderId: string;
}

export interface CancelOrderParams {
  orderId: string;
}

export interface CancelOrderResponse {}

export interface CancelAllOrdersParams {
  pair: string;
}

export interface CancelAllOrdersResponse {}

export interface TriggerOrderParams {
  pair: string;
  side: Side;
  triggerType: TriggerType;
  amount: number;
  triggerPrice: number;
  trailingDistance?: number;
  trailingPercentage?: number;
}

export interface TriggerOrderResponse {
  id: string;
}

export interface AdvancedOrderParams {
  pair: string;
  side: Side;
  amount: number;
  stopLossPrice: number;
  takeProfitPrice: number;
}

export interface AdvancedOrderResponse {
  id: string;
}

export interface TWAPOrderParams {
  pair: string;
  side: Side;
  quantity: number;
  exchanges: Array<string>;
  split: number;
  executionInterval: number;
}

export interface TWAPOrderResponse {
  dealID: string;
  amount: number;
}

export interface Order {
  id: string;
  side: Side;
  pair: string;
  timestamp: number;
  quantity: number;
  exchangeRate: number;
  executedQuantity: number;
  tradeFee: number | null;
  feeAsset: number | null;
}

export interface OrdersParams {
  pairs: Array<string>;
  startDate: number;
  endDate: number;
  pageSize: number;
  pageNum: number;
}

export interface OrdersResponse {
  orders: Array<Order>;
}

export interface SpecificOrderParams {
  id: string;
}

export interface OrderTrade {
  id: string;
  symbol: string;
  type: Type;
  orderAmount: number;
  amountFilled: number;
  executedPrice: number;
  timestamp: number;
  status: Status;
}

export interface SpecificOrderResponse {
  id: string;
  side: Side;
  pair: string;
  timestamp: number;
  quantity: number;
  exchangeRate: number;
  executedQuantity: number;
  trades: Array<OrderTrade>;
}

export interface TradesParams {
  pairs: Array<string>;
  startDate: number;
  endDate: number;
  pageSize: number;
  pageNum: number;
}

export interface Trade {
  id: string;
  symbol: string;
  side: Side;
  tradeAmout: number;
  executedPrice: number;
  timestamp: number;
  orderId: string;
}

export interface TradesResponse {
  trades: Array<Trade>;
}

export interface TransactionParams {
  transactionId: number;
}

export interface TransactionResponse {
  transactionId: number;
  createDate: string;
  assetName: string;
  amount: number;
  type: TransactionType;
  status: Status;
}

export interface Instrument {
  name: string;
  pricePrecision: number;
  amountPrecision: number;
}

export interface FuturesInstrumentsResponse {
  instruments: Array<Instrument>;
}

export interface FuturesPositionsParams {
  status: FuturesStatus;
}

export interface Position {
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
}

export interface FuturesPositionResponse {
  positions: Array<Position>;
}

export interface FuturesOrderParams {
  instrument: string;
  positionAction: FuturesAction;
  positionSide: FuturesSide;
  type: 'market';
  quantity: number;
}

export interface FuturesOrderResponse {
  id: string;
}
