import { CryptoAsset, ChartData, NewsItem } from './types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoAssets(ids: string[] = ['bitcoin', 'ethereum', 'base']): Promise<CryptoAsset[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto assets');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching crypto assets:', error);
    return [];
  }
}

export async function fetchAssetPrice(id: string): Promise<number> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${id}&vs_currencies=usd`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch asset price');
    }
    
    const data = await response.json();
    return data[id]?.usd || 0;
  } catch (error) {
    console.error('Error fetching asset price:', error);
    return 0;
  }
}

export async function fetchChartData(id: string, days = 7): Promise<ChartData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch chart data');
    }
    
    const data = await response.json();
    return data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp,
      price,
    }));
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return [];
  }
}

// Mock news data for demo purposes
export async function fetchCryptoNews(): Promise<NewsItem[]> {
  // In a real app, this would fetch from a news API
  return [
    {
      id: '1',
      title: 'Bitcoin Reaches New All-Time High',
      description: 'Bitcoin surges past $75,000 as institutional adoption continues to grow.',
      url: '#',
      publishedAt: new Date(),
      source: 'CryptoNews',
      imageUrl: '/news-1.jpg',
    },
    {
      id: '2',
      title: 'Ethereum 2.0 Staking Rewards Increase',
      description: 'Staking rewards on Ethereum 2.0 see significant increase following network upgrade.',
      url: '#',
      publishedAt: new Date(Date.now() - 3600000),
      source: 'DeFi Daily',
      imageUrl: '/news-2.jpg',
    },
  ];
}

export async function fetchTrendingAssets(): Promise<CryptoAsset[]> {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/search/trending`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending assets');
    }
    
    const data = await response.json();
    return data.coins.slice(0, 5).map((coin: any) => ({
      id: coin.item.id,
      symbol: coin.item.symbol,
      name: coin.item.name,
      image: coin.item.large,
      current_price: 0, // Would need separate API call for price
      price_change_24h: 0,
      price_change_percentage_24h: 0,
      market_cap: 0,
      market_cap_rank: coin.item.market_cap_rank,
      total_volume: 0,
    }));
  } catch (error) {
    console.error('Error fetching trending assets:', error);
    return [];
  }
}
