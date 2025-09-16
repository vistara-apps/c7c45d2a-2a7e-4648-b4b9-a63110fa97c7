import { useMiniKit } from '@coinbase/minikit';

export interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  isConnected: boolean;
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  price: number;
  change24h: number;
  changePercent24h: number;
}

// Mock portfolio data for demonstration
export const mockPortfolioAssets: PortfolioAsset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 2.5,
    value: 8750,
    price: 3500,
    change24h: 125,
    changePercent24h: 3.8,
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.15,
    value: 9750,
    price: 65000,
    change24h: -975,
    changePercent24h: -1.5,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 5000,
    value: 5000,
    price: 1.00,
    change24h: 0,
    changePercent24h: 0,
  },
];

export async function connectWallet(): Promise<WalletInfo | null> {
  try {
    // In a real implementation, this would use MiniKit's wallet connection
    // For now, we'll simulate a connection
    const mockWallet: WalletInfo = {
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      balance: '12.5',
      network: 'Base',
      isConnected: true,
    };

    // Store connection status
    if (typeof window !== 'undefined') {
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockWallet.address);
    }

    return mockWallet;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
}

export async function disconnectWallet(): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAddress');
    }
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
  }
}

export function getWalletInfo(): WalletInfo | null {
  if (typeof window === 'undefined') return null;

  const isConnected = localStorage.getItem('walletConnected') === 'true';
  const address = localStorage.getItem('walletAddress');

  if (!isConnected || !address) return null;

  return {
    address,
    balance: '12.5', // Mock balance
    network: 'Base',
    isConnected: true,
  };
}

export async function fetchPortfolioAssets(): Promise<PortfolioAsset[]> {
  try {
    // In a real implementation, this would fetch from the connected wallet
    // For now, return mock data
    return mockPortfolioAssets;
  } catch (error) {
    console.error('Error fetching portfolio assets:', error);
    return [];
  }
}

export function formatWalletAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function useWalletConnection() {
  const { walletAddress, isWalletConnected } = useMiniKit();

  const connect = async () => {
    return await connectWallet();
  };

  const disconnect = async () => {
    return await disconnectWallet();
  };

  return {
    connect,
    disconnect,
    walletAddress,
    isConnected: isWalletConnected,
    walletInfo: getWalletInfo(),
  };
}

