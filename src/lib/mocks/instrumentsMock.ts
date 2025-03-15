import { Instrument, InstrumentQuote, InstrumentWithQuote } from '@/models/instruments';

// Lista de instrumentos financieros mock
export const mockInstruments: Instrument[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Technology',
    country: 'US',
    isActive: true,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Technology',
    country: 'US',
    isActive: true,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Technology',
    country: 'US',
    isActive: true,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Consumer Cyclical',
    country: 'US',
    isActive: true,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Consumer Cyclical',
    country: 'US',
    isActive: true,
  },
  {
    symbol: 'BTC-USD',
    name: 'Bitcoin USD',
    type: 'crypto',
    currency: 'USD',
    isActive: true,
  },
  {
    symbol: 'ETH-USD',
    name: 'Ethereum USD',
    type: 'crypto',
    currency: 'USD',
    isActive: true,
  },
  {
    symbol: 'EUR-USD',
    name: 'Euro US Dollar',
    type: 'forex',
    currency: 'USD',
    isActive: true,
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF',
    type: 'index',
    exchange: 'NYSE',
    currency: 'USD',
    country: 'US',
    isActive: true,
  },
  {
    symbol: 'GC=F',
    name: 'Gold Futures',
    type: 'commodity',
    exchange: 'COMEX',
    currency: 'USD',
    isActive: true,
  },
];

// Generar cotizaciones mock con datos aleatorios
export const generateMockQuote = (symbol: string): InstrumentQuote => {
  // Crear un precio base según el tipo de instrumento
  let basePrice = 0;
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
  else basePrice = 100;

  // Añadir una variación aleatoria al precio base (+/- 2%)
  const variation = (Math.random() * 4 - 2) / 100;
  const price = basePrice * (1 + variation);

  // Calcular otros valores basados en el precio
  const previousClose = basePrice * (1 + (Math.random() * 2 - 1) / 100);
  const change = price - previousClose;
  const changePercent = (change / previousClose) * 100;

  // Generar valores de rango para el día
  const open = previousClose * (1 + (Math.random() * 2 - 1) / 100);
  const rangePercent = Math.random() * 2 + 0.5; // 0.5%-2.5% de rango
  const range = (price * rangePercent) / 100;
  const high = Math.max(price, open) + Math.random() * range;
  const low = Math.min(price, open) - Math.random() * range;

  // Generar volumen proporcional al precio
  const volume = Math.round(basePrice * 100000 * (1 + Math.random()));

  // Capitalización de mercado (solo para acciones)
  let marketCap;
  if (['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'].includes(symbol)) {
    const shares = Math.round(Math.random() * 5 + 5) * 1000000000; // 5-10B acciones
    marketCap = price * shares;
  }

  return {
    symbol,
    price: parseFloat(price.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    open: parseFloat(open.toFixed(2)),
    high: parseFloat(high.toFixed(2)),
    low: parseFloat(low.toFixed(2)),
    previousClose: parseFloat(previousClose.toFixed(2)),
    volume,
    marketCap,
    timestamp: Date.now(),
  };
};

// Obtener instrumentos con cotizaciones
export const getMockInstrumentsWithQuotes = (): InstrumentWithQuote[] => {
  return mockInstruments.map((instrument) => ({
    ...instrument,
    quote: generateMockQuote(instrument.symbol),
  }));
};

// Obtener un instrumento específico con cotización
export const getMockInstrumentWithQuote = (symbol: string): InstrumentWithQuote | undefined => {
  const instrument = mockInstruments.find((i) => i.symbol === symbol);
  if (!instrument) return undefined;

  return {
    ...instrument,
    quote: generateMockQuote(symbol),
  };
};
