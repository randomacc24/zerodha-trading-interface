import axios from 'axios';
import { ZerodhaCredentials, Portfolio, Holding, Order, MarketData } from '../types/zerodha';

class ZerodhaAPI {
  private baseURL = 'https://api.kite.trade';
  private credentials: ZerodhaCredentials | null = null;
  private accessToken: string | null = null;

  setCredentials(credentials: ZerodhaCredentials) {
    this.credentials = credentials;
    this.accessToken = credentials.accessToken || null;
  }

  private getHeaders() {
    return {
      'X-Kite-Version': '3',
      'Authorization': `token ${this.credentials?.apiKey}:${this.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  async login(apiKey: string, apiSecret: string): Promise<{ accessToken: string }> {
    try {
      // In a real implementation, you would use Zerodha's login flow
      // This is a mock implementation for demonstration
      const response = await axios.post(`${this.baseURL}/session/token`, {
        api_key: apiKey,
        api_secret: apiSecret,
      });
      
      this.accessToken = response.data.access_token;
      return { accessToken: this.accessToken };
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Failed to authenticate with Zerodha');
    }
  }

  async getPortfolio(): Promise<Portfolio> {
    try {
      const response = await axios.get(`${this.baseURL}/portfolio/positions`, {
        headers: this.getHeaders(),
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      // Return mock data for demonstration
      return this.getMockPortfolio();
    }
  }

  async getHoldings(): Promise<Holding[]> {
    try {
      const response = await axios.get(`${this.baseURL}/portfolio/holdings`, {
        headers: this.getHeaders(),
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch holdings:', error);
      // Return mock data for demonstration
      return this.getMockHoldings();
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const response = await axios.get(`${this.baseURL}/orders`, {
        headers: this.getHeaders(),
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  }

  async getMarketData(symbols: string[]): Promise<MarketData[]> {
    try {
      const response = await axios.get(`${this.baseURL}/quote/ltp`, {
        headers: this.getHeaders(),
        params: { i: symbols.join(',') },
      });
      
      return Object.values(response.data.data);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      return [];
    }
  }

  async placeOrder(orderParams: {
    tradingsymbol: string;
    exchange: string;
    transaction_type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    product: string;
    order_type: string;
  }): Promise<{ order_id: string }> {
    try {
      const response = await axios.post(`${this.baseURL}/orders/regular`, orderParams, {
        headers: this.getHeaders(),
      });
      
      return { order_id: response.data.data.order_id };
    } catch (error) {
      console.error('Failed to place order:', error);
      throw new Error('Failed to place order');
    }
  }

  // Mock data for demonstration
  private getMockPortfolio(): Portfolio {
    return {
      net: 125000,
      day_pnl: 2500,
      day_pnl_percentage: 2.04,
      holdings: this.getMockHoldings(),
    };
  }

  private getMockHoldings(): Holding[] {
    return [
      {
        tradingsymbol: 'RELIANCE',
        exchange: 'NSE',
        isin: 'INE002A01018',
        quantity: 100,
        average_price: 2450.50,
        last_price: 2500.00,
        pnl: 4950.00,
        day_change: 25.50,
        day_change_percentage: 1.03,
      },
      {
        tradingsymbol: 'TCS',
        exchange: 'NSE',
        isin: 'INE467B01029',
        quantity: 50,
        average_price: 3200.00,
        last_price: 3350.00,
        pnl: 7500.00,
        day_change: 45.00,
        day_change_percentage: 1.36,
      },
      {
        tradingsymbol: 'INFY',
        exchange: 'NSE',
        isin: 'INE009A01021',
        quantity: 200,
        average_price: 1450.00,
        last_price: 1420.00,
        pnl: -6000.00,
        day_change: -15.00,
        day_change_percentage: -1.04,
      },
    ];
  }
}

export const zerodhaAPI = new ZerodhaAPI(); 