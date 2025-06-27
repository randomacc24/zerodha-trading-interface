import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Holding } from '../types/zerodha';

interface HoldingsTableProps {
  holdings: Holding[];
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings }) => {
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="table-header">
            <th className="text-left p-4">Symbol</th>
            <th className="text-left p-4">Exchange</th>
            <th className="text-right p-4">Quantity</th>
            <th className="text-right p-4">Avg Price</th>
            <th className="text-right p-4">Last Price</th>
            <th className="text-right p-4">P&L</th>
            <th className="text-right p-4">Day Change</th>
            <th className="text-right p-4">Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <tr key={index} className="table-row">
              <td className="p-4">
                <div>
                  <div className="font-medium text-matte-white">{holding.tradingsymbol}</div>
                  <div className="text-sm text-matte-white/70">{holding.isin}</div>
                </div>
              </td>
              <td className="p-4 text-matte-white/70">{holding.exchange}</td>
              <td className="p-4 text-right font-mono text-matte-white">
                {formatNumber(holding.quantity)}
              </td>
              <td className="p-4 text-right font-mono text-matte-white">
                {formatCurrency(holding.average_price)}
              </td>
              <td className="p-4 text-right font-mono text-matte-white">
                {formatCurrency(holding.last_price)}
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-1">
                  {holding.pnl >= 0 ? (
                    <TrendingUp size={16} className="text-accent-green" />
                  ) : (
                    <TrendingDown size={16} className="text-accent-red" />
                  )}
                  <span className={`font-mono ${holding.pnl >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {formatCurrency(holding.pnl)}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-1">
                  {holding.day_change >= 0 ? (
                    <TrendingUp size={16} className="text-accent-green" />
                  ) : (
                    <TrendingDown size={16} className="text-accent-red" />
                  )}
                  <span className={`font-mono ${holding.day_change >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {formatPercentage(holding.day_change_percentage)}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right font-mono text-matte-white">
                {formatCurrency(holding.quantity * holding.last_price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {holdings.length === 0 && (
        <div className="text-center py-8 text-matte-white/70">
          <p>No holdings found</p>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable; 