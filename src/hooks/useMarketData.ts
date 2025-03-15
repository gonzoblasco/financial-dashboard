'use client';

import { useQuery } from '@tanstack/react-query';
import { marketDataService } from '@/services/marketDataService';
import { MarketDataParams, TimeFrame } from '@/models/marketData';

export function useMarketData(params: MarketDataParams) {
  const { symbol, timeframe, limit } = params;

  const marketDataQuery = useQuery({
    queryKey: ['marketData', symbol, timeframe, limit],
    queryFn: () => marketDataService.getHistoricalData(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!symbol && !!timeframe,
    refetchOnWindowFocus: false,
  });

  // Hook para obtener datos optimizados para visualización
  const useOptimizedData = (days: number = 30) => {
    return useQuery({
      queryKey: ['marketData', 'optimized', symbol, timeframe, days],
      queryFn: () => marketDataService.getOptimizedHistoricalData(symbol, timeframe, days),
      staleTime: 5 * 60 * 1000, // 5 minutos
      enabled: !!symbol && !!timeframe,
      refetchOnWindowFocus: false,
    });
  };

  return {
    data: marketDataQuery.data?.data || [],
    isLoading: marketDataQuery.isLoading,
    isError: marketDataQuery.isError,
    error: marketDataQuery.error,
    refetch: marketDataQuery.refetch,
    useOptimizedData,
  };
}
