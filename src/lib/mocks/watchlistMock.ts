import { Watchlist } from '@/models/watchlist';

// Watchlists de ejemplo
export const mockWatchlists: Watchlist[] = [
  {
    id: 'default',
    name: 'Default Watchlist',
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'],
    isDefault: true,
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 días atrás
    updatedAt: Date.now(),
  },
  {
    id: 'crypto',
    name: 'Crypto',
    symbols: ['BTC-USD', 'ETH-USD'],
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 días atrás
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 días atrás
  },
  {
    id: 'forex',
    name: 'Forex',
    symbols: ['EUR-USD'],
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 días atrás
    updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 días atrás
  },
];

// Función para obtener todas las watchlists
export const getMockWatchlists = (): Watchlist[] => {
  return [...mockWatchlists];
};

// Función para obtener una watchlist específica
export const getMockWatchlist = (id: string): Watchlist | undefined => {
  return mockWatchlists.find((w) => w.id === id);
};
