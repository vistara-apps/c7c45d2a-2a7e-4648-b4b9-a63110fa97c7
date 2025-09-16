# CryptoPulse - Base Mini App

A unified crypto portfolio tracker and alert system built for Farcaster users using Base MiniKit and OnchainKit.

## Features

- **Unified Portfolio View**: Connect multiple wallets and view all crypto assets in one dashboard
- **Real-time Price Tracking**: Live cryptocurrency prices and market data
- **Custom Alerts**: Set price alerts and receive notifications
- **Interactive Charts**: Visual representation of portfolio performance
- **Social Integration**: Built for Farcaster with seamless wallet connection

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base network integration via MiniKit
- **UI**: Tailwind CSS with custom design system
- **Data**: CoinGecko API for cryptocurrency data
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Base App:**
   Navigate to `http://localhost:3000` in Base App or Farcaster client

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # App header with user info
│   ├── PortfolioSummary.tsx  # Portfolio overview
│   ├── AssetList.tsx     # Cryptocurrency asset list
│   └── Navigation.tsx    # Bottom navigation
├── lib/                  # Utilities and types
│   ├── api.ts           # API functions
│   ├── types.ts         # TypeScript interfaces
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## Key Components

### MiniKit Integration
- Wallet connection via Base network
- Farcaster user context and identity
- Transaction handling and approvals

### Portfolio Management
- Multi-wallet asset aggregation
- Real-time price updates
- Performance tracking and analytics

### Alert System
- Custom price thresholds
- Market movement notifications
- News and event alerts

## API Integration

The app uses the CoinGecko API for cryptocurrency data:
- Real-time prices and market data
- Historical price charts
- Trending cryptocurrencies
- Market statistics

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
