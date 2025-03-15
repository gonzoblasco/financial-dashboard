'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { watchlistService } from '@/services/watchlistService';
import { Watchlist } from '@/models/watchlist';

export function useWatchlists() {
  const queryClient = useQueryClient();

  // Obtener todas las watchlists
  const watchlistsQuery = useQuery({
    queryKey: ['watchlists'],
    queryFn: () => watchlistService.getWatchlists(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Obtener una watchlist específica
  const getWatchlist = (id: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: ['watchlist', id],
      queryFn: () => watchlistService.getWatchlistById(id),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!id,
    });
  };

  // Crear una watchlist
  const createWatchlistMutation = useMutation({
    mutationFn: ({ name, symbols }: { name: string; symbols?: string[] }) =>
      watchlistService.createWatchlist(name, symbols),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
    },
  });

  // Actualizar una watchlist
  const updateWatchlistMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Watchlist> }) =>
      watchlistService.updateWatchlist(id, updates),
    onSuccess: (updatedWatchlist) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', updatedWatchlist.id] });
    },
  });

  // Eliminar una watchlist
  const deleteWatchlistMutation = useMutation({
    mutationFn: (id: string) => watchlistService.deleteWatchlist(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', id] });
    },
  });

  // Añadir un símbolo a una watchlist
  const addSymbolMutation = useMutation({
    mutationFn: ({ watchlistId, symbol }: { watchlistId: string; symbol: string }) =>
      watchlistService.addSymbolToWatchlist(watchlistId, symbol),
    onSuccess: (updatedWatchlist) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', updatedWatchlist.id] });
    },
  });

  // Eliminar un símbolo de una watchlist
  const removeSymbolMutation = useMutation({
    mutationFn: ({ watchlistId, symbol }: { watchlistId: string; symbol: string }) =>
      watchlistService.removeSymbolFromWatchlist(watchlistId, symbol),
    onSuccess: (updatedWatchlist) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      queryClient.invalidateQueries({ queryKey: ['watchlist', updatedWatchlist.id] });
    },
  });

  return {
    watchlists: watchlistsQuery.data || [],
    isLoading: watchlistsQuery.isLoading,
    isError: watchlistsQuery.isError,
    error: watchlistsQuery.error,
    getWatchlist,
    createWatchlist: createWatchlistMutation.mutate,
    updateWatchlist: updateWatchlistMutation.mutate,
    deleteWatchlist: deleteWatchlistMutation.mutate,
    addSymbol: addSymbolMutation.mutate,
    removeSymbol: removeSymbolMutation.mutate,
  };
}
