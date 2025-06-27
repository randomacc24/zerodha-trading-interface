import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Portfolio } from '../types/zerodha';

interface PortfolioChartProps {
  portfolio: Portfolio | null;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio }) => {
  // Mock data for demonstration - in real app, this would come from historical data
  const data = [
    { date: 'Mon', value: 120000 },
    { date: 'Tue', value: 122000 },
    { date: 'Wed', value: 118000 },
    { date: 'Thu', value: 125000 },
    { date: 'Fri', value: 127000 },
    { date: 'Sat', value: 126000 },
    { date: 'Sun', value: 125000 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-matte-gray border border-matte-light-gray rounded-lg p-3">
          <p className="text-matte-white font-medium">{`Date: ${label}`}</p>
          <p className="text-accent-blue">
            {`Portfolio Value: ${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
          <XAxis 
            dataKey="date" 
            stroke="#f8f8f8"
            fontSize={12}
          />
          <YAxis 
            stroke="#f8f8f8"
            fontSize={12}
            tickFormatter={formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#4ecdc4" 
            strokeWidth={2}
            dot={{ fill: '#4ecdc4', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#4ecdc4', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart; 