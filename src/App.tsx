import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import TradingPanel from './components/TradingPanel';
import { zerodhaAPI } from './services/zerodhaApi';
import axios from 'axios';

const ZERODHA_API_KEY = '0picqbrzc7r96te5';
const REDIRECT_URI = 'https://randomacc24.github.io/zerodha-trading-interface/#/';

function getRequestTokenFromUrl() {
  // Check both search and hash for request_token
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('request_token')) {
    return searchParams.get('request_token');
  }
  // If using hash routing, parse the hash
  if (window.location.hash) {
    // Example: #/?request_token=xxxx&action=login
    const hash = window.location.hash.substring(1); // remove '#'
    const hashQuery = hash.split('?')[1];
    if (hashQuery) {
      const hashParams = new URLSearchParams(hashQuery);
      return hashParams.get('request_token');
    }
  }
  return null;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'trading'>('dashboard');

  useEffect(() => {
    const requestToken = getRequestTokenFromUrl();
    if (requestToken) {
      handleZerodhaOAuth(requestToken);
    }
    // eslint-disable-next-line
  }, []);

  const handleZerodhaOAuth = async (requestToken: string) => {
    setIsLoading(true);
    try {
      // Exchange request_token for access_token via backend
      const response = await axios.post('/api/zerodha/token', {
        request_token: requestToken,
      });
      const accessToken = response.data.data.access_token;
      zerodhaAPI.setCredentials({ apiKey: ZERODHA_API_KEY, apiSecret: '', accessToken });
      setIsAuthenticated(true);
      // Remove request_token from URL
      window.history.replaceState({}, document.title, REDIRECT_URI);
    } catch (error) {
      alert('Failed to authenticate with Zerodha. Please try again.');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('dashboard');
  };

  const handlePlaceOrder = async (order: {
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
  }) => {
    try {
      await zerodhaAPI.placeOrder({
        tradingsymbol: order.symbol,
        exchange: 'NSE',
        transaction_type: order.type,
        quantity: order.quantity,
        price: order.price,
        product: 'CNC',
        order_type: 'LIMIT',
      });
      alert(`Order placed successfully! ${order.type} ${order.quantity} ${order.symbol} at ₹${order.price}`);
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return <LoginForm isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-matte-black">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-matte-gray border-r border-matte-light-gray min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-matte-light-gray text-matte-white'
                    : 'text-matte-white/70 hover:text-matte-white hover:bg-matte-light-gray'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('trading')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeView === 'trading'
                    ? 'bg-matte-light-gray text-matte-white'
                    : 'text-matte-white/70 hover:text-matte-white hover:bg-matte-light-gray'
                }`}
              >
                Trading Panel
              </button>
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'trading' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <TradingPanel onPlaceOrder={handlePlaceOrder} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App; 