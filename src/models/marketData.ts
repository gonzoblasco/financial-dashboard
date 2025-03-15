/**
 * Intervalo de tiempo para datos históricos
 */
export type TimeFrame = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1M';

/**
 * Datos de vela/OHLCV (Open, High, Low, Close, Volume)
 */
export interface OHLCV {
  timestamp: number; // Timestamp en milisegundos
  open: number; // Precio de apertura
  high: number; // Precio más alto
  low: number; // Precio más bajo
  close: number; // Precio de cierre
  volume: number; // Volumen
}

/**
 * Parámetros para solicitar datos históricos
 */
export interface MarketDataParams {
  symbol: string; // Símbolo del instrumento
  timeframe: TimeFrame; // Intervalo de tiempo
  from?: Date | number | string; // Fecha de inicio (opcional)
  to?: Date | number | string; // Fecha de fin (opcional)
  limit?: number; // Número máximo de registros a devolver
}

/**
 * Respuesta de datos históricos
 */
export interface MarketDataResponse {
  symbol: string; // Símbolo del instrumento
  timeframe: TimeFrame; // Intervalo de tiempo
  data: OHLCV[]; // Array de datos OHLCV
}
