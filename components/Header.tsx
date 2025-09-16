'use client';

import { ArrowLeft, Bell } from 'lucide-react';
import { useMiniKit } from '@coinbase/minikit';

export function Header() {
  const { context } = useMiniKit();
  
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">CryptoPulse</h1>
          <p className="text-sm text-muted-foreground">
            {context?.user?.displayName || 'Portfolio Tracker'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="px-3 py-1 bg-success/20 text-success text-sm font-medium rounded-full">
          Online
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200">
          <Bell className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </header>
  );
}
