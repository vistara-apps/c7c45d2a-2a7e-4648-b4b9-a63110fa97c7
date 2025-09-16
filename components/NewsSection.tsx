'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { fetchCryptoAssets } from '../lib/api';
import { CryptoAsset } from '../lib/types';
import { formatCurrency, formatPercentage, getChangeColor } from '../lib/utils';
import { MiniChart } from './ui/MiniChart';

export function NewsSection() {
  const [featuredAsset, setFeaturedAsset] = useState<CryptoAsset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedAsset() {
      try {
        const assets = await fetchCryptoAssets(['bitcoin']);
        if (assets.length > 0) {
          setFeaturedAsset(assets[0]);
        }
      } catch (error) {
        console.error('Error loading featured asset:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedAsset();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
        <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-muted rounded"></div>
      </div>
    );
  }

  if (!featuredAsset) {
    return null;
  }

  const isPositive = featuredAsset.price_change_percentage_24h >= 0;

  return (
    <div className="bg-card rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">News</h2>
          <p className="text-sm text-muted-foreground">Real-time market updates</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Featured Asset Portfolio</p>
          <p className="text-lg font-bold text-card-foreground">
            {formatCurrency(43684.85)}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-card-foreground">
            {formatCurrency(featuredAsset.current_price)}
          </h3>
          <div className={`flex items-center space-x-1 ${getChangeColor(featuredAsset.price_change_percentage_24h)}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {formatPercentage(featuredAsset.price_change_percentage_24h)}
            </span>
          </div>
        </div>
        
        <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
          <MiniChart 
            data={[
              { time: '9am', value: featuredAsset.current_price * 0.98 },
              { time: '12pm', value: featuredAsset.current_price * 0.99 },
              { time: '3pm', value: featuredAsset.current_price * 1.02 },
              { time: '6pm', value: featuredAsset.current_price },
            ]}
            color={isPositive ? '#22c55e' : '#ef4444'}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>9am</span>
          <span>12pm</span>
          <span>3pm</span>
          <span>6pm</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
}
