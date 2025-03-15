import { OHLCV, MarketDataParams, MarketDataResponse, TimeFrame } from '@/models/marketData';

// Función para generar datos OHLCV históricos de prueba
export const generateMockOHLCVData = (params: MarketDataParams): MarketDataResponse => {
  const { symbol, timeframe, limit = 100 } = params;
  const data: OHLCV[] = [];

  // Determinar el intervalo en milisegundos según el timeframe
  const getIntervalMs = (tf: TimeFrame): number => {
    switch (tf) {
      case '1m':
        return 60 * 1000;
      case '5m':
        return 5 * 60 * 1000;
      case '15m':
        return 15 * 60 * 1000;
      case '30m':
        return 30 * 60 * 1000;
      case '1h':
        return 60 * 60 * 1000;
      case '4h':
        return 4 * 60 * 60 * 1000;
      case '1d':
        return 24 * 60 * 60 * 1000;
      case '1w':
        return 7 * 24 * 60 * 60 * 1000;
      case '1M':
        return 30 * 24 * 60 * 60 * 1000;
      default:
        return 24 * 60 * 60 * 1000; // 1d por defecto
    }
  };

  // Establecer precio base según el símbolo
  let basePrice = 100;
  if (symbol === 'AAPL') basePrice = 180;
  else if (symbol === 'MSFT') basePrice = 350;
  else if (symbol === 'GOOGL') basePrice = 140;
  else if (symbol === 'AMZN') basePrice = 170;
  else if (symbol === 'TSLA') basePrice = 180;
  else if (symbol === 'BTC-USD') basePrice = 53000;
  else if (symbol === 'ETH-USD') basePrice = 2800;
  else if (symbol === 'EUR-USD') basePrice = 1.08;
  else if (symbol === 'SPY') basePrice = 470;
  else if (symbol === 'GC=F') basePrice = 1970;

  // Determinar timestamp final (ahora) y calcular el inicial
  const endTime = Date.now();
  const intervalMs = getIntervalMs(timeframe);

  // Volatilidad basada en el tipo de activo
  let volatility = 0.01; // 1% por defecto
  if (symbol.includes('BTC') || symbol.includes('ETH')) {
    volatility = 0.03; // Mayor para crypto
  } else if (symbol === 'TSLA') {
    volatility = 0.025; // Mayor para acciones volátiles
  }

  // Generar tendencia base (alcista, bajista o lateral)
  const trend = Math.random() > 0.6 ? 0.0001 : Math.random() > 0.5 ? 0.0002 : -0.0001;

  // Generar datos históricos
  let currentPrice = basePrice;

  for (let i = 0; i < limit; i++) {
    const timestamp = endTime - (limit - i) * intervalMs;

    // Aplicar tendencia y volatilidad
    const changePercent = (Math.random() * 2 - 1) * volatility + trend;
    currentPrice = currentPrice * (1 + changePercent);

    // Calcular valores OHLC basados en el precio actual
    const dailyVolatility = volatility * currentPrice;
    const open = currentPrice;
    const close = currentPrice * (1 + (Math.random() * 0.01 - 0.005));
    const high = Math.max(open, close) + Math.random() * dailyVolatility;
    const low = Math.min(open, close) - Math.random() * dailyVolatility;

    // Generar volumen proporcional al precio y volatilidad
    const volume = Math.round(
      basePrice * 100000 * (1 + Math.random() + Math.abs(changePercent) * 10)
    );

    data.push({
      timestamp,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    });

    currentPrice = close;
  }

  return {
    symbol,
    timeframe,
    data,
  };
};
