import { MarketDataParams, MarketDataResponse, TimeFrame } from '@/models/marketData';
import { generateMockOHLCVData } from '@/lib/mocks/marketDataMock';

/**
 * Servicio para obtener datos históricos de mercado
 */
export const marketDataService = {
  /**
   * Obtiene datos históricos para un instrumento
   */
  getHistoricalData: async (params: MarketDataParams): Promise<MarketDataResponse> => {
    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 800));
    return generateMockOHLCVData(params);
  },

  /**
   * Obtiene datos históricos optimizados para visualización
   * (reduciendo número de puntos para periodos largos)
   */
  getOptimizedHistoricalData: async (
    symbol: string,
    timeframe: TimeFrame,
    days: number
  ): Promise<MarketDataResponse> => {
    // Calcular el número óptimo de puntos según el periodo
    let limit = 100;

    if (timeframe === '1d') {
      limit = Math.min(days, 365); // Máximo 1 año de datos diarios
    } else if (timeframe === '1h') {
      limit = Math.min(days * 8, 500); // 8 horas por día, máximo 500 puntos
    } else if (timeframe === '1w') {
      limit = Math.min(Math.ceil(days / 7), 200); // Convertir días a semanas
    }

    // Simular retardo de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    return generateMockOHLCVData({
      symbol,
      timeframe,
      limit,
    });
  },
};
