import React, { useState } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import TradingPanel from './components/TradingPanel';
import { zerodhaAPI } from './services/zerodhaApi';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'trading'>('dashboard');

  const handleLogin = async (apiKey: string, apiSecret: string) => {
    setIsLoading(true);
    try {
      // Set credentials in the API service
      zerodhaAPI.setCredentials({ apiKey, apiSecret });
      
      // Attempt to login (this would normally validate credentials)
      await zerodhaAPI.login(apiKey, apiSecret);
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
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
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} isLoading={isLoading} />;
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