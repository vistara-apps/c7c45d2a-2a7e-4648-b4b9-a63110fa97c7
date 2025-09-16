'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency, formatPercentage } from '../lib/utils';

interface AssetAllocationChartProps {
  assets?: Array<{
    symbol: string;
    name: string;
    value: number;
    percentage: number;
    color: string;
  }>;
  showLegend?: boolean;
  compact?: boolean;
}

export function AssetAllocationChart({
  assets,
  showLegend = true,
  compact = false
}: AssetAllocationChartProps) {
  // Mock data for demonstration
  const mockAssets = [
    { symbol: 'BTC', name: 'Bitcoin', value: 25000, percentage: 35, color: '#f7931a' },
    { symbol: 'ETH', name: 'Ethereum', value: 17500, percentage: 25, color: '#627eea' },
    { symbol: 'USDC', name: 'USD Coin', value: 17500, percentage: 25, color: '#2775ca' },
    { symbol: 'SOL', name: 'Solana', value: 8750, percentage: 12.5, color: '#9945ff' },
    { symbol: 'ADA', name: 'Cardano', value: 1750, percentage: 2.5, color: '#0033ad' },
  ];

  const data = assets || mockAssets;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{data.name} ({data.symbol})</p>
          <p className="text-sm text-muted-foreground">Value: {formatCurrency(data.value)}</p>
          <p className="text-sm text-muted-foreground">Allocation: {formatPercentage(data.percentage)}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    if (!showLegend) return null;

    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.value} ({formatPercentage(data[index]?.percentage || 0)})
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (compact) {
    return (
      <div className="bg-card rounded-lg p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Asset Allocation</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="percentage"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend payload={data.map(item => ({ value: item.symbol, color: item.color }))} />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Portfolio Allocation</h3>
          <p className="text-sm text-muted-foreground">Distribution of your crypto assets</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-lg font-semibold text-card-foreground">
            {formatCurrency(data.reduce((sum, asset) => sum + asset.value, 0))}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="percentage"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend content={<CustomLegend />} />}
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-card-foreground">Assets</h4>
          {data.map((asset, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: asset.color }}
                >
                  {asset.symbol.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{asset.symbol}</p>
                  <p className="text-sm text-muted-foreground">{asset.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-card-foreground">
                  {formatCurrency(asset.value)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatPercentage(asset.percentage)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Largest Holding</p>
          <p className="text-lg font-semibold text-card-foreground">
            {data.reduce((max, asset) => asset.percentage > max.percentage ? asset : max).symbol}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatPercentage(Math.max(...data.map(a => a.percentage)))}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Diversification</p>
          <p className="text-lg font-semibold text-card-foreground">
            {data.length} Assets
          </p>
          <p className="text-xs text-muted-foreground">
            {data.filter(a => a.percentage >= 10).length} Major
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Concentration</p>
          <p className="text-lg font-semibold text-card-foreground">
            {Math.max(...data.map(a => a.percentage)).toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">Max allocation</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Risk Level</p>
          <p className="text-lg font-semibold text-card-foreground">
            {data.length <= 2 ? 'High' : data.length <= 4 ? 'Medium' : 'Low'}
          </p>
          <p className="text-xs text-muted-foreground">Based on diversification</p>
        </div>
      </div>
    </div>
  );
}

