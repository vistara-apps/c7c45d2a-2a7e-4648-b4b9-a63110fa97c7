'use client';

import { TrendingUp, Settings } from 'lucide-react';
import { formatCompactCurrency } from '../lib/utils';

export function RecommendedSection() {
  return (
    <div className="bg-card rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Recommended</h3>
        <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-card-foreground">
            {formatCompactCurrency(99700)}
          </p>
          <div className="flex items-center space-x-1 text-success mt-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">4,800</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-lg font-bold text-white">₿</span>
          </div>
          <p className="text-lg font-bold text-card-foreground">4,800</p>
        </div>
      </div>
    </div>
  );
}
