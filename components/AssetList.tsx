'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { fetchCryptoAssets } from '../lib/api';
import { CryptoAsset } from '../lib/types';
import { formatCurrency, formatPercentage, getChangeColor } from '../lib/utils';
import { AssetCard } from './ui/AssetCard';

export function AssetList() {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'news' | 'portfolio' | 'alerts'>('news');

  useEffect(() => {
    async function loadAssets() {
      try {
        const cryptoAssets = await fetchCryptoAssets(['bitcoin', 'ethereum', 'base']);
        setAssets(cryptoAssets);
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  const tabs = [
    { id: 'news' as const, label: 'News' },
    { id: 'portfolio' as const, label: 'Portfolio' },
    { id: 'alerts' as const, label: 'Alerts' },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => (
            <div key={tab.id} className="h-8 bg-muted rounded w-20 animate-pulse"></div>
          ))}
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted/20 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-card text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div className="space-y-3">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            variant="withChart"
          />
        ))}
      </div>
    </div>
  );
}
