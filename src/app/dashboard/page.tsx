'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { InstrumentsTable } from '@/components/data-display/InstrumentsTable';
import { LineChart } from '@/components/charts/LineChart';
import { useInstruments } from '@/hooks/useInstruments';
import { useMarketData } from '@/hooks/useMarketData';
import { TimeframeSelector } from '@/components/charts/TimeframeSelector';
import { useState, useEffect } from 'react';
import { TimeFrame } from '@/models/marketData';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [timeframe, setTimeframe] = useState<TimeFrame>('1d');
  const router = useRouter();

  // Obtenemos los instrumentos con cotizaciones
  const { instrumentsWithQuotes, isLoading: isLoadingInstruments } = useInstruments();

  // Obtenemos los datos de mercado históricos
  const { data: marketData, isLoading: isLoadingMarketData } = useMarketData({
    symbol: selectedSymbol,
    timeframe,
    limit: 100,
  });

  // Manejar la selección de un instrumento
  const handleSelectInstrument = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  // Manejar el cambio de timeframe
  const handleTimeframeChange = (newTimeframe: TimeFrame) => {
    setTimeframe(newTimeframe);
  };

  // Redirigir a la página de detalles del instrumento
  const handleViewInstrument = () => {
    router.push(`/instrument/${selectedSymbol}`);
  };

  // Seleccionar instrumento por defecto si no hay ninguno seleccionado
  useEffect(() => {
    if (!selectedSymbol && instrumentsWithQuotes.length > 0) {
      setSelectedSymbol(instrumentsWithQuotes[0].symbol);
    }
  }, [selectedSymbol, instrumentsWithQuotes]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Financial Dashboard</h1>

        {/* Gráfico del instrumento seleccionado */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow p-4 border border-gray-100 dark:border-dark-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {selectedSymbol} -{' '}
              {instrumentsWithQuotes.find((i) => i.symbol === selectedSymbol)?.name || 'Loading...'}
            </h2>
            <div className="flex space-x-4">
              <TimeframeSelector
                selectedTimeframe={timeframe}
                onTimeframeChange={handleTimeframeChange}
                availableTimeframes={['1d', '1w', '1M']}
              />
              <button
                onClick={handleViewInstrument}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>

          {isLoadingMarketData ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Loading chart data...</p>
            </div>
          ) : marketData && marketData.length > 0 ? (
            <LineChart data={marketData} height={320} />
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No chart data available</p>
            </div>
          )}
        </div>

        {/* Tabla de instrumentos */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
          <div className="p-4 border-b border-gray-200 dark:border-dark-border">
            <h2 className="text-xl font-semibold">Market Overview</h2>
          </div>
          {isLoadingInstruments ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">Loading instruments...</p>
            </div>
          ) : (
            <InstrumentsTable
              instruments={instrumentsWithQuotes}
              onSelectInstrument={handleSelectInstrument}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
