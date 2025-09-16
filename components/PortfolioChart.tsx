'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';
import { formatCurrency, formatPercentage } from '../lib/utils';

interface PortfolioChartProps {
  portfolioData?: Array<{
    date: string;
    value: number;
    change: number;
  }>;
  timeRange?: '1D' | '7D' | '30D' | '90D' | '1Y';
  onTimeRangeChange?: (range: string) => void;
}

export function PortfolioChart({
  portfolioData,
  timeRange = '7D',
  onTimeRangeChange
}: PortfolioChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  // Mock data for demonstration
  const mockData = [
    { date: '2024-01-01', value: 10000, change: 0 },
    { date: '2024-01-02', value: 10200, change: 2.0 },
    { date: '2024-01-03', value: 10150, change: -0.49 },
    { date: '2024-01-04', value: 10300, change: 1.48 },
    { date: '2024-01-05', value: 10500, change: 1.94 },
    { date: '2024-01-06', value: 10400, change: -0.95 },
    { date: '2024-01-07', value: 10600, change: 1.92 },
  ];

  const data = portfolioData || mockData;

  const timeRanges = ['1D', '7D', '30D', '90D', '1Y'];

  const handleTimeRangeChange = (range: string) => {
    setSelectedRange(range as typeof timeRange);
    onTimeRangeChange?.(range);
  };

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || 0;
  const totalChange = currentValue - previousValue;
  const totalChangePercent = previousValue > 0 ? (totalChange / previousValue) * 100 : 0;
  const isPositive = totalChange >= 0;

  const formatTooltipValue = (value: number) => formatCurrency(value);
  const formatTooltipLabel = (label: string) => new Date(label).toLocaleDateString();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{formatTooltipLabel(label)}</p>
          <p className="text-lg font-semibold text-card-foreground">
            {formatTooltipValue(data.value)}
          </p>
          <p className={`text-sm ${data.change >= 0 ? 'text-success' : 'text-danger'}`}>
            {formatPercentage(data.change)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Portfolio Performance</h3>
          <p className="text-sm text-muted-foreground">Track your investment growth over time</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType(chartType === 'line' ? 'area' : 'line')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
            title={`Switch to ${chartType === 'line' ? 'area' : 'line'} chart`}
          >
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Current Value & Change */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-card-foreground">
            {formatCurrency(currentValue)}
          </p>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {formatPercentage(totalChangePercent)} ({formatCurrency(Math.abs(totalChange))})
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Time Range</p>
          <p className="text-sm font-medium text-card-foreground">{selectedRange}</p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-1 bg-muted/20 rounded-lg p-1">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => handleTimeRangeChange(range)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-200 ${
              selectedRange === range
                ? 'bg-card text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#22c55e' : '#ef4444'}
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#22c55e' : '#ef4444'}
                strokeWidth={2}
                dot={{ fill: isPositive ? '#22c55e' : '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: isPositive ? '#22c55e' : '#ef4444', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Highest</p>
          <p className="text-lg font-semibold text-card-foreground">
            {formatCurrency(Math.max(...data.map(d => d.value)))}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Lowest</p>
          <p className="text-lg font-semibold text-card-foreground">
            {formatCurrency(Math.min(...data.map(d => d.value)))}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Average</p>
          <p className="text-lg font-semibold text-card-foreground">
            {formatCurrency(data.reduce((sum, d) => sum + d.value, 0) / data.length)}
          </p>
        </div>
      </div>
    </div>
  );
}

