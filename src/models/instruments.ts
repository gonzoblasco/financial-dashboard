/**
 * Tipos de instrumentos financieros soportados
 */
export type InstrumentType = 'stock' | 'forex' | 'crypto' | 'index' | 'commodity';

/**
 * Modelo básico de un instrumento financiero
 */
export interface Instrument {
  symbol: string; // Símbolo único del instrumento (ej: AAPL, BTC-USD)
  name: string; // Nombre completo (ej: "Apple Inc.")
  type: InstrumentType; // Tipo de instrumento
  exchange?: string; // Bolsa/Exchange donde se negocia
  currency: string; // Moneda base (USD, EUR, etc.)
  logo?: string; // URL del logo (opcional)
  sector?: string; // Sector industrial (para acciones)
  country?: string; // País de origen (opcional)
  isActive: boolean; // Si está activo para trading
}

/**
 * Datos de cotización actuales de un instrumento
 */
export interface InstrumentQuote {
  symbol: string; // Símbolo del instrumento
  price: number; // Precio actual
  change: number; // Cambio absoluto
  changePercent: number; // Cambio porcentual
  open: number; // Precio de apertura
  high: number; // Precio más alto
  low: number; // Precio más bajo
  previousClose: number; // Cierre anterior
  volume: number; // Volumen
  marketCap?: number; // Capitalización de mercado (para acciones)
  timestamp: number; // Timestamp de la última actualización
}

/**
 * Instrumento con datos de cotización incluidos
 */
export interface InstrumentWithQuote extends Instrument {
  quote: InstrumentQuote;
}
