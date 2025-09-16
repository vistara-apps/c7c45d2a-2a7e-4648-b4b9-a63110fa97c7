export interface User {
  farcasterId: string;
  connectedWallets: string[];
  linkedExchanges: string[];
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  priceAlerts: boolean;
  newsAlerts: boolean;
  portfolioUpdates: boolean;
}

export interface Portfolio {
  userId: string;
  assetSymbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  allocationPercentage: number;
  change24h: number;
  changePercent24h: number;
}

export interface Alert {
  id: string;
  userId: string;
  assetSymbol: string;
  conditionType: 'price_above' | 'price_below' | 'percent_change';
  thresholdValue: number;
  isActive: boolean;
  createdAt: Date;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  source: string;
  imageUrl?: string;
}

export interface ChartData {
  timestamp: number;
  price: number;
}
