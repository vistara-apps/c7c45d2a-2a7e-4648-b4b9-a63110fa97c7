// Database connection and schema definitions
// Using a simple in-memory store for demo purposes
// In production, this would connect to a real database like PostgreSQL or MongoDB

export interface User {
  id: string;
  farcasterId: string;
  connectedWallets: string[];
  linkedExchanges: string[];
  notificationPreferences: {
    priceAlerts: boolean;
    newsAlerts: boolean;
    portfolioUpdates: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  id: string;
  userId: string;
  assetSymbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  allocationPercentage: number;
  change24h: number;
  changePercent24h: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  id: string;
  userId: string;
  assetSymbol: string;
  conditionType: 'price_above' | 'price_below' | 'percent_change';
  thresholdValue: number;
  isActive: boolean;
  createdAt: Date;
  lastTriggered?: Date;
}

// In-memory storage for demo
let users: User[] = [];
let portfolios: Portfolio[] = [];
let alerts: Alert[] = [];

// User operations
export const userOperations = {
  create: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const user: User = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(user);
    return user;
  },

  findByFarcasterId: (farcasterId: string): User | undefined => {
    return users.find(user => user.farcasterId === farcasterId);
  },

  update: (id: string, updates: Partial<User>): User | null => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date(),
    };
    return users[index];
  },

  getAll: (): User[] => users,
};

// Portfolio operations
export const portfolioOperations = {
  create: (portfolioData: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>): Portfolio => {
    const portfolio: Portfolio = {
      ...portfolioData,
      id: `portfolio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    portfolios.push(portfolio);
    return portfolio;
  },

  findByUserId: (userId: string): Portfolio[] => {
    return portfolios.filter(portfolio => portfolio.userId === userId);
  },

  update: (id: string, updates: Partial<Portfolio>): Portfolio | null => {
    const index = portfolios.findIndex(portfolio => portfolio.id === id);
    if (index === -1) return null;

    portfolios[index] = {
      ...portfolios[index],
      ...updates,
      updatedAt: new Date(),
    };
    return portfolios[index];
  },

  delete: (id: string): boolean => {
    const index = portfolios.findIndex(portfolio => portfolio.id === id);
    if (index === -1) return false;

    portfolios.splice(index, 1);
    return true;
  },

  getAll: (): Portfolio[] => portfolios,
};

// Alert operations
export const alertOperations = {
  create: (alertData: Omit<Alert, 'id' | 'createdAt'>): Alert => {
    const alert: Alert = {
      ...alertData,
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    alerts.push(alert);
    return alert;
  },

  findByUserId: (userId: string): Alert[] => {
    return alerts.filter(alert => alert.userId === userId);
  },

  update: (id: string, updates: Partial<Alert>): Alert | null => {
    const index = alerts.findIndex(alert => alert.id === id);
    if (index === -1) return null;

    alerts[index] = {
      ...alerts[index],
      ...updates,
    };
    return alerts[index];
  },

  delete: (id: string): boolean => {
    const index = alerts.findIndex(alert => alert.id === id);
    if (index === -1) return false;

    alerts.splice(index, 1);
    return true;
  },

  getActive: (): Alert[] => {
    return alerts.filter(alert => alert.isActive);
  },

  getAll: (): Alert[] => alerts,
};

// Initialize with some demo data
export const initializeDemoData = () => {
  if (users.length === 0) {
    // Create demo user
    const demoUser = userOperations.create({
      farcasterId: 'demo_user_123',
      connectedWallets: ['0x742d35Cc6634C0532925a3b844Bc454e4438f44e'],
      linkedExchanges: [],
      notificationPreferences: {
        priceAlerts: true,
        newsAlerts: true,
        portfolioUpdates: true,
      },
    });

    // Create demo portfolio
    portfolioOperations.create({
      userId: demoUser.id,
      assetSymbol: 'ETH',
      quantity: 2.5,
      averageBuyPrice: 3200,
      currentPrice: 3500,
      allocationPercentage: 45,
      change24h: 125,
      changePercent24h: 3.8,
    });

    portfolioOperations.create({
      userId: demoUser.id,
      assetSymbol: 'BTC',
      quantity: 0.15,
      averageBuyPrice: 68000,
      currentPrice: 65000,
      allocationPercentage: 35,
      change24h: -975,
      changePercent24h: -1.5,
    });

    portfolioOperations.create({
      userId: demoUser.id,
      assetSymbol: 'USDC',
      quantity: 5000,
      averageBuyPrice: 1.00,
      currentPrice: 1.00,
      allocationPercentage: 20,
      change24h: 0,
      changePercent24h: 0,
    });

    // Create demo alerts
    alertOperations.create({
      userId: demoUser.id,
      assetSymbol: 'BTC',
      conditionType: 'price_above',
      thresholdValue: 70000,
      isActive: true,
    });

    alertOperations.create({
      userId: demoUser.id,
      assetSymbol: 'ETH',
      conditionType: 'price_below',
      thresholdValue: 3000,
      isActive: true,
    });
  }
};

