'use client';

import { useState } from 'react';
import { Bell, TrendingUp, TrendingDown, X } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { Alert } from '../../lib/types';

interface AlertConfigurationProps {
  variant?: 'price' | 'news';
  assetSymbol?: string;
  onSave?: (alert: Partial<Alert>) => void;
  onClose?: () => void;
}

export function AlertConfiguration({ 
  variant = 'price', 
  assetSymbol = 'BTC',
  onSave,
  onClose 
}: AlertConfigurationProps) {
  const [alertType, setAlertType] = useState<'price_above' | 'price_below'>('price_above');
  const [threshold, setThreshold] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSave = () => {
    if (!threshold) return;
    
    const alert: Partial<Alert> = {
      assetSymbol,
      conditionType: alertType,
      thresholdValue: parseFloat(threshold),
      isActive,
    };
    
    onSave?.(alert);
  };

  return (
    <div className="bg-card rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-card-foreground">
            Set {variant === 'price' ? 'Price' : 'News'} Alert
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition-colors duration-200"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {variant === 'price' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Asset: {assetSymbol}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Alert Type
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setAlertType('price_above')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  alertType === 'price_above'
                    ? 'bg-success/20 text-success border border-success/30'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Above</span>
              </button>
              <button
                onClick={() => setAlertType('price_below')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  alertType === 'price_below'
                    ? 'bg-danger/20 text-danger border border-danger/30'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <TrendingDown className="h-4 w-4" />
                <span>Below</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Price Threshold ($)
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder="Enter price..."
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="active" className="text-sm text-card-foreground">
              Active alert
            </label>
          </div>

          <div className="flex space-x-2">
            <PrimaryButton onClick={handleSave} className="flex-1">
              Save Alert
            </PrimaryButton>
            {onClose && (
              <PrimaryButton variant="outline" onClick={onClose}>
                Cancel
              </PrimaryButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
