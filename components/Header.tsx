'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Wallet, LogOut } from 'lucide-react';
import { useMiniKit } from '@coinbase/minikit';
import { connectWallet, disconnectWallet, getWalletInfo, formatWalletAddress, WalletInfo } from '../lib/wallet';
import { PrimaryButton } from './ui/PrimaryButton';

export function Header() {
  const { context } = useMiniKit();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check for existing wallet connection on mount
    const existingWallet = getWalletInfo();
    setWalletInfo(existingWallet);
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const wallet = await connectWallet();
      setWalletInfo(wallet);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet();
      setWalletInfo(null);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">CryptoPulse</h1>
          <p className="text-sm text-muted-foreground">
            {context?.user?.displayName || 'Portfolio Tracker'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {walletInfo ? (
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-success/20 text-success text-sm font-medium rounded-full flex items-center space-x-1">
              <Wallet className="h-3 w-3" />
              <span>{formatWalletAddress(walletInfo.address)}</span>
            </div>
            <button
              onClick={handleDisconnectWallet}
              className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200"
              title="Disconnect Wallet"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <PrimaryButton
            onClick={handleConnectWallet}
            disabled={isConnecting}
            size="sm"
            className="flex items-center space-x-1"
          >
            <Wallet className="h-4 w-4" />
            <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
          </PrimaryButton>
        )}
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200">
          <Bell className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </header>
  );
}
