import { Watchlist } from '@/models/watchlist';
import { getMockWatchlist, getMockWatchlists } from '@/lib/mocks/watchlistMock';

/**
 * Servicio para gestionar watchlists
 */
export const watchlistService = {
  /**
   * Obtiene todas las watchlists del usuario
   */
  getWatchlists: async (): Promise<Watchlist[]> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getMockWatchlists();
  },

  /**
   * Obtiene una watchlist específica por su ID
   */
  getWatchlistById: async (id: string): Promise<Watchlist | null> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 300));
    const watchlist = getMockWatchlist(id);
    return watchlist || null;
  },

  /**
   * Crea una nueva watchlist
   */
  createWatchlist: async (name: string, symbols: string[] = []): Promise<Watchlist> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = Date.now();
    const newWatchlist: Watchlist = {
      id: `wl_${now}`,
      name,
      symbols,
      createdAt: now,
      updatedAt: now,
    };

    return newWatchlist;
  },

  /**
   * Actualiza una watchlist existente
   */
  updateWatchlist: async (id: string, updates: Partial<Watchlist>): Promise<Watchlist> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    const watchlist = getMockWatchlist(id);
    if (!watchlist) {
      throw new Error(`Watchlist with id ${id} not found`);
    }

    const updatedWatchlist: Watchlist = {
      ...watchlist,
      ...updates,
      updatedAt: Date.now(),
    };

    return updatedWatchlist;
  },

  /**
   * Elimina una watchlist
   */
  deleteWatchlist: async (id: string): Promise<boolean> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 400));

    const watchlist = getMockWatchlist(id);
    if (!watchlist) {
      throw new Error(`Watchlist with id ${id} not found`);
    }

    if (watchlist.isDefault) {
      throw new Error('Cannot delete default watchlist');
    }

    return true;
  },

  /**
   * Añade un símbolo a una watchlist
   */
  addSymbolToWatchlist: async (watchlistId: string, symbol: string): Promise<Watchlist> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 300));

    const watchlist = getMockWatchlist(watchlistId);
    if (!watchlist) {
      throw new Error(`Watchlist with id ${watchlistId} not found`);
    }

    if (watchlist.symbols.includes(symbol)) {
      return watchlist; // El símbolo ya está en la watchlist
    }

    const updatedWatchlist: Watchlist = {
      ...watchlist,
      symbols: [...watchlist.symbols, symbol],
      updatedAt: Date.now(),
    };

    return updatedWatchlist;
  },

  /**
   * Elimina un símbolo de una watchlist
   */
  removeSymbolFromWatchlist: async (watchlistId: string, symbol: string): Promise<Watchlist> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 300));

    const watchlist = getMockWatchlist(watchlistId);
    if (!watchlist) {
      throw new Error(`Watchlist with id ${watchlistId} not found`);
    }

    const updatedWatchlist: Watchlist = {
      ...watchlist,
      symbols: watchlist.symbols.filter((s) => s !== symbol),
      updatedAt: Date.now(),
    };

    return updatedWatchlist;
  },
};
