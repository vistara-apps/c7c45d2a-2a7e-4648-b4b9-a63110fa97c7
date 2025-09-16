'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Eye, Plus, Wallet } from 'lucide-react';
import { formatCompactCurrency } from '../lib/utils';
import { PrimaryButton } from './ui/PrimaryButton';
import { fetchPortfolioAssets, getWalletInfo, PortfolioAsset } from '../lib/wallet';

interface PortfolioData {
  totalValue: number;
  change24h: number;
  changePercent24h: number;
  recommendedValue: number;
  recommendedChange: number;
}

export function PortfolioSummary() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalValue: 0,
    change24h: 0,
    changePercent24h: 0,
    recommendedValue: 99700,
    recommendedChange: 4800,
  });

  const [showBalance, setShowBalance] = useState(true);
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const loadPortfolio = async () => {
      const walletInfo = getWalletInfo();
      setIsWalletConnected(!!walletInfo);

      if (walletInfo) {
        try {
          const portfolioAssets = await fetchPortfolioAssets();
          setAssets(portfolioAssets);

          // Calculate total portfolio value and 24h change
          const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
          const totalChange24h = portfolioAssets.reduce((sum, asset) => sum + asset.change24h, 0);
          const totalChangePercent24h = totalValue > 0 ? (totalChange24h / (totalValue - totalChange24h)) * 100 : 0;

          setPortfolio(prev => ({
            ...prev,
            totalValue,
            change24h: totalChange24h,
            changePercent24h: totalChangePercent24h,
          }));
        } catch (error) {
          console.error('Error loading portfolio:', error);
        }
      }
      setLoading(false);
    };

    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-card rounded-lg p-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-20 mb-2"></div>
          <div className="h-8 bg-muted rounded w-32 mb-4"></div>
          <div className="h-6 bg-muted rounded w-24"></div>
        </div>
        <div className="bg-card rounded-lg p-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-24 mb-2"></div>
          <div className="h-6 bg-muted rounded w-28"></div>
        </div>
      </div>
    );
  }

  if (!isWalletConnected) {
    return (
      <div className="space-y-4">
        {/* Wallet Connection Prompt */}
        <div className="bg-card rounded-lg p-4 text-center">
          <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect your wallet to view your portfolio and start tracking your crypto investments.
          </p>
          <PrimaryButton className="w-full">
            Connect Wallet
          </PrimaryButton>
        </div>
      </div>
    );
  }

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
          <div className={`flex items-center space-x-1 ${portfolio.changePercent24h >= 0 ? 'text-success' : 'text-danger'}`}>
            <TrendingUp className={`h-4 w-4 ${portfolio.changePercent24h < 0 ? 'rotate-180' : ''}`} />
            <span className="text-sm font-medium">
              {portfolio.changePercent24h >= 0 ? '+' : ''}{portfolio.changePercent24h.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {assets.length} Assets • ${portfolio.totalValue.toLocaleString()}
            </p>
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
