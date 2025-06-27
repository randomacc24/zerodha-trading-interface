import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (apiKey: string, apiSecret: string) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey && apiSecret) {
      onLogin(apiKey, apiSecret);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-matte-black">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-matte-light-gray rounded-full flex items-center justify-center mb-4">
            <Lock size={32} className="text-accent-blue" />
          </div>
          <h2 className="text-2xl font-bold text-matte-white">Login to Zerodha</h2>
          <p className="text-matte-white/70 mt-2">Enter your API credentials to access trading features</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-matte-white mb-2">
              API Key
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-field w-full"
              placeholder="Enter your Zerodha API Key"
              required
            />
          </div>

          <div>
            <label htmlFor="apiSecret" className="block text-sm font-medium text-matte-white mb-2">
              API Secret
            </label>
            <div className="relative">
              <input
                id="apiSecret"
                type={showSecret ? 'text' : 'password'}
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                className="input-field w-full pr-10"
                placeholder="Enter your Zerodha API Secret"
                required
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-matte-white/70 hover:text-matte-white"
              >
                {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !apiKey || !apiSecret}
            className="btn-success w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-matte-black"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <span>Connect to Zerodha</span>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-matte-light-gray rounded-lg">
          <h3 className="text-sm font-medium text-matte-white mb-2">How to get API credentials:</h3>
          <ol className="text-xs text-matte-white/70 space-y-1">
            <li>1. Log in to your Zerodha Kite account</li>
            <li>2. Go to Developer Console</li>
            <li>3. Create a new API application</li>
            <li>4. Copy your API Key and Secret</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 