import React, { useState } from 'react';
import { ArrowUp, ArrowDown, DollarSign, Package } from 'lucide-react';

interface TradingPanelProps {
  onPlaceOrder: (order: {
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
  }) => void;
}

const TradingPanel: React.FC<TradingPanelProps> = ({ onPlaceOrder }) => {
  const [symbol, setSymbol] = useState('');
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !quantity || !price) return;

    setIsLoading(true);
    try {
      await onPlaceOrder({
        symbol: symbol.toUpperCase(),
        type: orderType,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      });
      
      // Reset form
      setSymbol('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Failed to place order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const popularSymbols = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICIBANK'];

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Package size={24} className="text-accent-blue" />
        <h3 className="text-lg font-semibold text-matte-white">Place Order</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Type Selection */}
        <div>
          <label className="block text-sm font-medium text-matte-white mb-3">
            Order Type
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setOrderType('BUY')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border-2 transition-all ${
                orderType === 'BUY'
                  ? 'border-accent-green bg-accent-green/10 text-accent-green'
                  : 'border-matte-light-gray text-matte-white/70 hover:border-accent-green/50'
              }`}
            >
              <ArrowUp size={20} />
              <span className="font-medium">BUY</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('SELL')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border-2 transition-all ${
                orderType === 'SELL'
                  ? 'border-accent-red bg-accent-red/10 text-accent-red'
                  : 'border-matte-light-gray text-matte-white/70 hover:border-accent-red/50'
              }`}
            >
              <ArrowDown size={20} />
              <span className="font-medium">SELL</span>
            </button>
          </div>
        </div>

        {/* Symbol Input */}
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-matte-white mb-2">
            Symbol
          </label>
          <input
            id="symbol"
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="input-field w-full"
            placeholder="Enter stock symbol (e.g., RELIANCE)"
            required
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {popularSymbols.map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => setSymbol(sym)}
                className="px-2 py-1 text-xs bg-matte-light-gray text-matte-white rounded hover:bg-matte-gray transition-colors"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-matte-white mb-2">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-field w-full"
              placeholder="0"
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-matte-white mb-2">
              Price
            </label>
            <div className="relative">
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field w-full pr-8"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
              <DollarSign size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-matte-white/50" />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {quantity && price && (
          <div className="bg-matte-light-gray rounded-lg p-4">
            <h4 className="text-sm font-medium text-matte-white mb-2">Order Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-matte-white/70">Symbol:</span>
                <span className="text-matte-white font-mono">{symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-matte-white/70">Type:</span>
                <span className={`font-medium ${orderType === 'BUY' ? 'text-accent-green' : 'text-accent-red'}`}>
                  {orderType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-matte-white/70">Quantity:</span>
                <span className="text-matte-white font-mono">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-matte-white/70">Price:</span>
                <span className="text-matte-white font-mono">₹{price}</span>
              </div>
              <div className="flex justify-between border-t border-matte-gray pt-2 mt-2">
                <span className="text-matte-white font-medium">Total Value:</span>
                <span className="text-matte-white font-mono font-medium">
                  ₹{(parseFloat(quantity) * parseFloat(price)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !symbol || !quantity || !price}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            orderType === 'BUY'
              ? 'bg-accent-green hover:bg-green-500 text-matte-black'
              : 'bg-accent-red hover:bg-red-500 text-matte-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Placing Order...</span>
            </div>
          ) : (
            `${orderType} ${symbol}`
          )}
        </button>
      </form>
    </div>
  );
};

export default TradingPanel; 