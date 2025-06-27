import React from 'react';

const ZERODHA_API_KEY = '0picqbrzc7r96te5';
const REDIRECT_URI = 'https://randomacc24.github.io/zerodha-trading-interface/';

const getZerodhaLoginUrl = () =>
  `https://kite.zerodha.com/connect/login?v=3&api_key=${ZERODHA_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

interface LoginFormProps {
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading }) => {
  const handleLogin = () => {
    window.location.href = getZerodhaLoginUrl();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-matte-black">
      <div className="card w-full max-w-md text-center">
        <div className="mx-auto w-16 h-16 bg-matte-light-gray rounded-full flex items-center justify-center mb-4">
          <img src="https://kite.trade/static/images/kite-logo.svg" alt="Kite Logo" className="h-10" />
        </div>
        <h2 className="text-2xl font-bold text-matte-white mb-2">Login with Zerodha</h2>
        <p className="text-matte-white/70 mb-8">Click below to securely login to your Zerodha account.</p>
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="btn-success w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg py-3"
        >
          <img src="https://kite.trade/static/images/kite-logo.svg" alt="Kite" className="h-6 mr-2" />
          <span>Login with Zerodha</span>
        </button>
        <div className="mt-8 p-4 bg-matte-light-gray rounded-lg text-left">
          <h3 className="text-sm font-medium text-matte-white mb-2">How it works:</h3>
          <ol className="text-xs text-matte-white/70 space-y-1 list-decimal list-inside">
            <li>Click "Login with Zerodha"</li>
            <li>Login securely on the official Zerodha Kite page</li>
            <li>After login, you'll be redirected back here</li>
            <li>We never ask for your API key or secret</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 