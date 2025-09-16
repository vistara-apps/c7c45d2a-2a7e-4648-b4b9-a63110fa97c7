'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';

interface OrderEntryProps {
  assetSymbol: string;
  currentPrice: number;
  availableBalance: number;
  onOrderSubmit?: (order: OrderData) => void;
  onClose?: () => void;
}

interface OrderData {
  type: 'buy' | 'sell';
  assetSymbol: string;
  quantity: number;
  price: number;
  total: number;
  orderType: 'market' | 'limit';
}

export function OrderEntry({
  assetSymbol,
  currentPrice,
  availableBalance,
  onOrderSubmit,
  onClose
}: OrderEntryProps) {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(currentPrice.toString());
  const [orderPriceType, setOrderPriceType] = useState<'market' | 'limit'>('market');

  const quantityNum = parseFloat(quantity) || 0;
  const priceNum = parseFloat(price) || currentPrice;
  const total = quantityNum * priceNum;
  const maxQuantity = orderType === 'buy' ? availableBalance / currentPrice : availableBalance;

  const handleSubmit = () => {
    if (!quantityNum || quantityNum <= 0) return;

    const order: OrderData = {
      type: orderType,
      assetSymbol,
      quantity: quantityNum,
      price: orderPriceType === 'market' ? currentPrice : priceNum,
      total,
      orderType: orderPriceType,
    };

    onOrderSubmit?.(order);
  };

  const setMaxQuantity = () => {
    setQuantity(maxQuantity.toFixed(6));
  };

  return (
    <div className="bg-card rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {assetSymbol.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">
              {orderType === 'buy' ? 'Buy' : 'Sell'} {assetSymbol.toUpperCase()}
            </h3>
            <p className="text-sm text-muted-foreground">
              ${currentPrice.toLocaleString()} current price
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition-colors duration-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Order Type Toggle */}
      <div className="flex space-x-2">
        <button
          onClick={() => setOrderType('buy')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 flex-1 ${
            orderType === 'buy'
              ? 'bg-success/20 text-success border border-success/30'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          <ArrowUp className="h-4 w-4" />
          <span>Buy</span>
        </button>
        <button
          onClick={() => setOrderType('sell')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 flex-1 ${
            orderType === 'sell'
              ? 'bg-danger/20 text-danger border border-danger/30'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          <ArrowDown className="h-4 w-4" />
          <span>Sell</span>
        </button>
      </div>

      {/* Order Price Type */}
      <div className="flex space-x-2">
        <button
          onClick={() => setOrderPriceType('market')}
          className={`px-3 py-2 rounded-lg transition-colors duration-200 flex-1 ${
            orderPriceType === 'market'
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setOrderPriceType('limit')}
          className={`px-3 py-2 rounded-lg transition-colors duration-200 flex-1 ${
            orderPriceType === 'limit'
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          Limit
        </button>
      </div>

      {/* Quantity Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-card-foreground">
            Quantity ({assetSymbol.toUpperCase()})
          </label>
          <button
            onClick={setMaxQuantity}
            className="text-xs text-primary hover:text-primary/80"
          >
            Max: {maxQuantity.toFixed(6)}
          </button>
        </div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="0.00"
          step="0.000001"
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Price Input (for limit orders) */}
      {orderPriceType === 'limit' && (
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Price (USD)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={currentPrice.toString()}
            step="0.01"
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-muted/20 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Price:</span>
          <span className="text-card-foreground">
            ${orderPriceType === 'market' ? currentPrice.toLocaleString() : priceNum.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Quantity:</span>
          <span className="text-card-foreground">{quantityNum.toFixed(6)} {assetSymbol.toUpperCase()}</span>
        </div>
        <div className="flex items-center justify-between font-medium">
          <span className="text-muted-foreground">Total:</span>
          <span className="text-card-foreground">${total.toLocaleString()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!quantityNum || quantityNum <= 0 || (orderType === 'buy' && total > availableBalance)}
          className={`flex-1 ${orderType === 'buy' ? 'bg-success hover:bg-success/90' : 'bg-danger hover:bg-danger/90'}`}
        >
          {orderType === 'buy' ? (
            <>
              <ArrowUp className="h-4 w-4 mr-2" />
              Buy {assetSymbol.toUpperCase()}
            </>
          ) : (
            <>
              <ArrowDown className="h-4 w-4 mr-2" />
              Sell {assetSymbol.toUpperCase()}
            </>
          )}
        </PrimaryButton>
        {onClose && (
          <PrimaryButton variant="outline" onClick={onClose}>
            Cancel
          </PrimaryButton>
        )}
      </div>

      {/* Insufficient Balance Warning */}
      {orderType === 'buy' && total > availableBalance && (
        <div className="bg-danger/20 border border-danger/30 rounded-lg p-3">
          <p className="text-sm text-danger">
            Insufficient balance. Available: ${availableBalance.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

