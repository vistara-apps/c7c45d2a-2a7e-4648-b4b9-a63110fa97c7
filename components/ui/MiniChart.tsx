'use client';

interface ChartDataPoint {
  time: string;
  value: number;
}

interface MiniChartProps {
  data: ChartDataPoint[];
  color?: string;
  compact?: boolean;
}

export function MiniChart({ data, color = '#22c55e', compact = false }: MiniChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-muted/20 rounded flex items-center justify-center ${compact ? 'h-12' : 'h-32'}`}>
        <span className="text-xs text-muted-foreground">No data</span>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : ((maxValue - point.value) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`relative ${compact ? 'h-12' : 'h-32'} w-full`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />
        {!compact && (
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
        {!compact && (
          <polygon
            fill="url(#gradient)"
            points={`${points} 100,100 0,100`}
          />
        )}
      </svg>
    </div>
  );
}
