'use client';

import { useQuery } from '@tanstack/react-query';
import { instrumentService } from '@/services/instrumentService';
import { Instrument, InstrumentWithQuote } from '@/models/instruments';

export function useInstruments() {
  // Obtener todos los instrumentos
  const instrumentsQuery = useQuery({
    queryKey: ['instruments'],
    queryFn: () => instrumentService.getAllInstruments(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Obtener instrumentos con cotizaciones
  const instrumentsWithQuotesQuery = useQuery({
    queryKey: ['instruments', 'quotes'],
    queryFn: () => instrumentService.getAllInstrumentsWithQuotes(),
    staleTime: 30 * 1000, // 30 segundos
    // En una app real, podríamos usar un intervalo de actualización
    // refetchInterval: 60 * 1000, // 1 minuto
  });

  // Función para buscar instrumentos
  const searchInstruments = async (query: string): Promise<Instrument[]> => {
    if (!query.trim()) return [];
    return instrumentService.searchInstruments(query);
  };

  // Función para obtener un instrumento con cotización por símbolo
  const getInstrumentWithQuote = async (symbol: string): Promise<InstrumentWithQuote | null> => {
    return instrumentService.getInstrumentWithQuote(symbol);
  };

  return {
    instruments: instrumentsQuery.data || [],
    instrumentsWithQuotes: instrumentsWithQuotesQuery.data || [],
    isLoading: instrumentsQuery.isLoading || instrumentsWithQuotesQuery.isLoading,
    isError: instrumentsQuery.isError || instrumentsWithQuotesQuery.isError,
    error: instrumentsQuery.error || instrumentsWithQuotesQuery.error,
    searchInstruments,
    getInstrumentWithQuote,
    refetch: () => {
      instrumentsQuery.refetch();
      instrumentsWithQuotesQuery.refetch();
    },
  };
}
