import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Activity, RefreshCw } from 'lucide-react';
import { Portfolio, Holding } from '../types/zerodha';
import { zerodhaAPI } from '../services/zerodhaApi';
import HoldingsTable from './HoldingsTable';
import PortfolioChart from './PortfolioChart';

const Dashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'orders'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [portfolioData, holdingsData] = await Promise.all([
        zerodhaAPI.getPortfolio(),
        zerodhaAPI.getHoldings(),
      ]);
      setPortfolio(portfolioData);
      setHoldings(holdingsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-matte-white">Dashboard</h2>
        <button
          onClick={loadData}
          className="btn-primary flex items-center space-x-2"
        >
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Portfolio Overview Cards */}
      {portfolio && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-matte-white/70">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-matte-white">
                  {formatCurrency(portfolio.net)}
                </p>
              </div>
              <div className="w-12 h-12 bg-matte-light-gray rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-accent-blue" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-matte-white/70">Day P&L</p>
                <p className="text-2xl font-bold text-matte-white">
                  {formatCurrency(portfolio.day_pnl)}
                </p>
                <p className={`text-sm ${portfolio.day_pnl >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                  {formatPercentage(portfolio.day_pnl_percentage)}
                </p>
              </div>
              <div className="w-12 h-12 bg-matte-light-gray rounded-lg flex items-center justify-center">
                {portfolio.day_pnl >= 0 ? (
                  <TrendingUp size={24} className="text-accent-green" />
                ) : (
                  <TrendingDown size={24} className="text-accent-red" />
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-matte-white/70">Total Holdings</p>
                <p className="text-2xl font-bold text-matte-white">
                  {holdings.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-matte-light-gray rounded-lg flex items-center justify-center">
                <Package size={24} className="text-accent-blue" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-matte-gray rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-matte-light-gray text-matte-white'
              : 'text-matte-white/70 hover:text-matte-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('holdings')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'holdings'
              ? 'bg-matte-light-gray text-matte-white'
              : 'text-matte-white/70 hover:text-matte-white'
          }`}
        >
          Holdings
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'orders'
              ? 'bg-matte-light-gray text-matte-white'
              : 'text-matte-white/70 hover:text-matte-white'
          }`}
        >
          Orders
        </button>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-matte-white">Portfolio Performance</h3>
            <PortfolioChart portfolio={portfolio} />
          </div>
        )}

        {activeTab === 'holdings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-matte-white">Your Holdings</h3>
            <HoldingsTable holdings={holdings} />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-matte-white">Recent Orders</h3>
            <div className="text-center py-8 text-matte-white/70">
              <Activity size={48} className="mx-auto mb-4 opacity-50" />
              <p>Order history will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 