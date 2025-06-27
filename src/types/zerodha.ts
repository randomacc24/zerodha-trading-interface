export interface ZerodhaCredentials {
  apiKey: string;
  apiSecret: string;
  accessToken?: string;
}

export interface Holding {
  tradingsymbol: string;
  exchange: string;
  isin: string;
  quantity: number;
  average_price: number;
  last_price: number;
  pnl: number;
  day_change: number;
  day_change_percentage: number;
}

export interface Portfolio {
  net: number;
  day_pnl: number;
  day_pnl_percentage: number;
  holdings: Holding[];
}

export interface Order {
  order_id: string;
  tradingsymbol: string;
  exchange: string;
  transaction_type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: string;
  timestamp: string;
}

export interface MarketData {
  tradingsymbol: string;
  last_price: number;
  change: number;
  change_percentage: number;
  high: number;
  low: number;
  volume: number;
  open: number;
  close: number;
} 