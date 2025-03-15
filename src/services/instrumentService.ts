import { Instrument, InstrumentWithQuote } from '@/models/instruments';
import {
  mockInstruments,
  getMockInstrumentWithQuote,
  getMockInstrumentsWithQuotes,
} from '@/lib/mocks/instrumentsMock';

/**
 * Servicio para obtener datos de instrumentos financieros
 */
export const instrumentService = {
  /**
   * Obtiene todos los instrumentos financieros disponibles
   */
  getAllInstruments: async (): Promise<Instrument[]> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mockInstruments];
  },

  /**
   * Obtiene un instrumento financiero por su símbolo
   */
  getInstrumentBySymbol: async (symbol: string): Promise<Instrument | null> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 300));
    const instrument = mockInstruments.find((i) => i.symbol === symbol);
    return instrument || null;
  },

  /**
   * Obtiene las cotizaciones actuales para todos los instrumentos
   */
  getAllInstrumentsWithQuotes: async (): Promise<InstrumentWithQuote[]> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 700));
    return getMockInstrumentsWithQuotes();
  },

  /**
   * Obtiene la cotización actual para un instrumento específico
   */
  getInstrumentWithQuote: async (symbol: string): Promise<InstrumentWithQuote | null> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 300));
    const instrumentWithQuote = getMockInstrumentWithQuote(symbol);
    return instrumentWithQuote || null;
  },

  /**
   * Busca instrumentos por término de búsqueda (nombre o símbolo)
   */
  searchInstruments: async (query: string): Promise<Instrument[]> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!query) return [];

    const normalizedQuery = query.toLowerCase();
    return mockInstruments.filter(
      (i) =>
        i.symbol.toLowerCase().includes(normalizedQuery) ||
        i.name.toLowerCase().includes(normalizedQuery)
    );
  },
};
