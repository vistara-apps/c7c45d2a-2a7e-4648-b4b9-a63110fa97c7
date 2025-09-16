'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Eye, Plus } from 'lucide-react';
import { formatCompactCurrency } from '../lib/utils';
import { PrimaryButton } from './ui/PrimaryButton';

interface PortfolioData {
  totalValue: number;
  change24h: number;
  changePercent24h: number;
  recommendedValue: number;
  recommendedChange: number;
}

export function PortfolioSummary() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalValue: 166900,
    change24h: 1500,
    changePercent24h: 2.4,
    recommendedValue: 99700,
    recommendedChange: 4800,
  });

  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-4">
      {/* Portfolio Balance */}
      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-muted-foreground">Portfolio</h3>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 hover:bg-secondary rounded transition-colors duration-200"
            >
              <Eye className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center space-x-1 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">
              +{portfolio.changePercent24h}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Balance: $1.5M</p>
            <p className="text-2xl font-bold text-card-foreground">
              {showBalance ? formatCompactCurrency(portfolio.totalValue) : '••••••'}
            </p>
          </div>
          <PrimaryButton variant="outline" className="px-3 py-2">
            <Plus className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">R</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Recommended</h3>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Settings</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Threat Lvl</p>
            <p className="text-2xl font-bold text-card-foreground">
              {formatCompactCurrency(portfolio.recommendedValue)}
            </p>
          </div>
          <div className="text-right">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mb-1">
              <span className="text-sm font-bold text-white">$</span>
            </div>
            <p className="text-lg font-bold text-card-foreground">
              {formatCompactCurrency(22700)}
            </p>
          </div>
        </div>
      </div>

      {/* Wealth Invited Banner */}
      <div className="bg-success/20 border border-success/30 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">W</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-success">Wealth Invited</h4>
            <p className="text-sm text-success/80">$5.5M+ Portfolio</p>
            <p className="text-xs text-success/70">High-yield, fixed-fee trading</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-success">Invited ✓</p>
          </div>
        </div>
      </div>
    </div>
  );
}
