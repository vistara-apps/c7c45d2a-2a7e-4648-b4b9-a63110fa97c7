'use client';

import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { CryptoAsset } from '../../lib/types';
import { formatCurrency, formatPercentage, getChangeColor } from '../../lib/utils';
import { MiniChart } from './MiniChart';

interface AssetCardProps {
  asset: CryptoAsset;
  variant?: 'default' | 'withChart' | 'compact';
}

export function AssetCard({ asset, variant = 'default' }: AssetCardProps) {
  const isPositive = asset.price_change_percentage_24h >= 0;
  
  // Mock chart data for demo
  const chartData = [
    { time: '1', value: asset.current_price * 0.98 },
    { time: '2', value: asset.current_price * 0.99 },
    { time: '3', value: asset.current_price * 1.01 },
    { time: '4', value: asset.current_price },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-card/80 transition-colors duration-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {asset.symbol.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-card-foreground">{asset.symbol.toUpperCase()}</p>
            <p className="text-sm text-muted-foreground">{asset.name}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-semibold text-card-foreground">
            {formatCurrency(asset.current_price)}
          </p>
          <p className={`text-sm ${getChangeColor(asset.price_change_percentage_24h)}`}>
            {formatPercentage(asset.price_change_percentage_24h)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-4 hover:bg-card/80 transition-colors duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {asset.symbol.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-card-foreground">{asset.symbol.toUpperCase()}</p>
            <p className="text-sm text-muted-foreground">{asset.name}</p>
          </div>
        </div>
        
        <button className="p-1 hover:bg-secondary rounded transition-colors duration-200">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-card-foreground">
            {formatCurrency(asset.current_price)}
          </p>
          <div className={`flex items-center space-x-1 ${getChangeColor(asset.price_change_percentage_24h)}`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="text-sm font-medium">
              {formatPercentage(asset.price_change_percentage_24h)}
            </span>
          </div>
        </div>
        
        {variant === 'withChart' && (
          <div className="w-20 h-12">
            <MiniChart 
              data={chartData}
              color={isPositive ? '#22c55e' : '#ef4444'}
              compact
            />
          </div>
        )}
      </div>
    </div>
  );
}
