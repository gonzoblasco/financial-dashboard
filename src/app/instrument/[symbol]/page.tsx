'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useInstruments } from '@/hooks/useInstruments';
import { useMarketData } from '@/hooks/useMarketData';
import { useState, useEffect } from 'react';
import { TimeFrame } from '@/models/marketData';
import { CandlestickChart } from '@/components/charts/CandlestickChart';
import { TimeframeSelector } from '@/components/charts/TimeframeSelector';
import { useParams } from 'next/navigation';

export default function InstrumentDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const [timeframe, setTimeframe] = useState<TimeFrame>('1d');

  // Obtenemos los datos del instrumento
  const { getInstrumentWithQuote } = useInstruments();
  const [instrument, setInstrument] = useState<any>(null);
  const [isLoadingInstrument, setIsLoadingInstrument] = useState(true);

  // Obtenemos los datos de mercado históricos
  const { data: marketData, isLoading: isLoadingMarketData } = useMarketData({
    symbol,
    timeframe,
    limit: 100,
  });

  // Manejar el cambio de timeframe
  const handleTimeframeChange = (newTimeframe: TimeFrame) => {
    setTimeframe(newTimeframe);
  };

  // Cargar los datos del instrumento
  useEffect(() => {
    const fetchInstrument = async () => {
      setIsLoadingInstrument(true);
      try {
        const data = await getInstrumentWithQuote(symbol);
        setInstrument(data);
      } catch (error) {
        console.error('Error fetching instrument:', error);
      } finally {
        setIsLoadingInstrument(false);
      }
    };

    if (symbol) {
      fetchInstrument();
    }
  }, [symbol, getInstrumentWithQuote]);

  // Calcular variación en el precio en el periodo seleccionado
  const calculatePriceChange = () => {
    if (!marketData || marketData.length < 2) return { change: 0, changePercent: 0 };

    const firstPrice = marketData[0].close;
    const lastPrice = marketData[marketData.length - 1].close;
    const change = lastPrice - firstPrice;
    const changePercent = (change / firstPrice) * 100;

    return { change, changePercent };
  };

  const priceChange = calculatePriceChange();

  // Formatear fecha para mostrar el rango de tiempo
  const formatDateRange = () => {
    if (!marketData || marketData.length < 2) return '';

    const startDate = new Date(marketData[0].timestamp);
    const endDate = new Date(marketData[marketData.length - 1].timestamp);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return `${startDate.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {isLoadingInstrument ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Loading instrument data...</p>
          </div>
        ) : instrument ? (
          <>
            {/* Cabecera con información del instrumento */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6 border border-gray-100 dark:border-dark-border">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{instrument.symbol}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{instrument.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {instrument.type.charAt(0).toUpperCase() + instrument.type.slice(1)}
                    </span>
                    {instrument.exchange && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {instrument.exchange}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {instrument.quote.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`text-lg font-medium ${
                      instrument.quote.changePercent > 0
                        ? 'text-green-500 dark:text-green-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {instrument.quote.change > 0 ? '+' : ''}
                    {instrument.quote.change.toFixed(2)}(
                    {instrument.quote.changePercent > 0 ? '+' : ''}
                    {instrument.quote.changePercent.toFixed(2)}%)
                  </p>
                </div>
              </div>

              {/* Estadísticas adicionales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Open</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {instrument.quote.open.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {instrument.quote.high.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {instrument.quote.low.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {instrument.quote.volume.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Gráfico de velas */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow p-4 border border-gray-100 dark:border-dark-border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Price Chart</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDateRange()}
                    {priceChange.change !== 0 && (
                      <span
                        className={`ml-2 ${
                          priceChange.changePercent > 0
                            ? 'text-green-500 dark:text-green-400'
                            : 'text-red-500 dark:text-red-400'
                        }`}
                      >
                        {priceChange.change > 0 ? '+' : ''}
                        {priceChange.change.toFixed(2)}({priceChange.changePercent > 0 ? '+' : ''}
                        {priceChange.changePercent.toFixed(2)}%)
                      </span>
                    )}
                  </p>
                </div>
                <TimeframeSelector
                  selectedTimeframe={timeframe}
                  onTimeframeChange={handleTimeframeChange}
                  availableTimeframes={['1d', '1w', '1M']}
                />
              </div>

              {isLoadingMarketData ? (
                <div className="h-96 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Loading chart data...</p>
                </div>
              ) : marketData && marketData.length > 0 ? (
                <CandlestickChart data={marketData} height={480} />
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">No chart data available</p>
                </div>
              )}
            </div>

            {/* Información adicional del instrumento */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6 border border-gray-100 dark:border-dark-border">
              <h2 className="text-xl font-semibold mb-4">About {instrument.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Details</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 text-gray-500 dark:text-gray-400">Symbol</td>
                        <td className="py-2 font-medium text-right">{instrument.symbol}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-500 dark:text-gray-400">Type</td>
                        <td className="py-2 font-medium text-right">
                          {instrument.type.charAt(0).toUpperCase() + instrument.type.slice(1)}
                        </td>
                      </tr>
                      {instrument.exchange && (
                        <tr>
                          <td className="py-2 text-gray-500 dark:text-gray-400">Exchange</td>
                          <td className="py-2 font-medium text-right">{instrument.exchange}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="py-2 text-gray-500 dark:text-gray-400">Currency</td>
                        <td className="py-2 font-medium text-right">{instrument.currency}</td>
                      </tr>
                      {instrument.sector && (
                        <tr>
                          <td className="py-2 text-gray-500 dark:text-gray-400">Sector</td>
                          <td className="py-2 font-medium text-right">{instrument.sector}</td>
                        </tr>
                      )}
                      {instrument.country && (
                        <tr>
                          <td className="py-2 text-gray-500 dark:text-gray-400">Country</td>
                          <td className="py-2 font-medium text-right">{instrument.country}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Market Data</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 text-gray-500 dark:text-gray-400">Previous Close</td>
                        <td className="py-2 font-medium text-right">
                          {instrument.quote.previousClose.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-500 dark:text-gray-400">Open</td>
                        <td className="py-2 font-medium text-right">
                          {instrument.quote.open.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-500 dark:text-gray-400">Day Range</td>
                        <td className="py-2 font-medium text-right">
                          {instrument.quote.low.toFixed(2)} - {instrument.quote.high.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-500 dark:text-gray-400">Volume</td>
                        <td className="py-2 font-medium text-right">
                          {instrument.quote.volume.toLocaleString()}
                        </td>
                      </tr>
                      {instrument.quote.marketCap && (
                        <tr>
                          <td className="py-2 text-gray-500 dark:text-gray-400">Market Cap</td>
                          <td className="py-2 font-medium text-right">
                            {(instrument.quote.marketCap / 1e9).toFixed(2)}B
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Instrument not found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
