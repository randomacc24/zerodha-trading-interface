import React from 'react';
import { User, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-matte-gray border-b border-matte-light-gray px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-matte-white">Zerodha Trading</h1>
          <div className="h-6 w-px bg-matte-light-gray"></div>
          <span className="text-sm text-matte-white/70">Professional Trading Interface</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2 text-matte-white">
                <User size={20} />
                <span className="text-sm">Trading Account</span>
              </div>
              <button className="btn-secondary flex items-center space-x-2">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button 
                onClick={onLogout}
                className="btn-danger flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="text-sm text-matte-white/70">
              Please login to access trading features
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 