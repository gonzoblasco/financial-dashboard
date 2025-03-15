'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useWatchlists } from '@/hooks/useWatchlists';
import { useInstruments } from '@/hooks/useInstruments';
import { InstrumentsTable } from '@/components/data-display/InstrumentsTable';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WatchlistPage() {
  const { watchlists, isLoading: isLoadingWatchlists } = useWatchlists();
  const { instrumentsWithQuotes, isLoading: isLoadingInstruments } = useInstruments();
  const [selectedWatchlistId, setSelectedWatchlistId] = useState<string | null>(null);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const router = useRouter();

  // Seleccionar la primera watchlist por defecto o la watchlist por defecto
  useEffect(() => {
    if (watchlists.length > 0 && !selectedWatchlistId) {
      const defaultWatchlist = watchlists.find((w) => w.isDefault) || watchlists[0];
      setSelectedWatchlistId(defaultWatchlist.id);
    }
  }, [watchlists, selectedWatchlistId]);

  // Filtrar instrumentos según la watchlist seleccionada
  useEffect(() => {
    if (selectedWatchlistId && instrumentsWithQuotes.length > 0) {
      const watchlist = watchlists.find((w) => w.id === selectedWatchlistId);
      if (watchlist) {
        const symbols = new Set(watchlist.symbols);
        const filtered = instrumentsWithQuotes.filter((i) => symbols.has(i.symbol));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setFilteredInstruments(filtered);
      }
    }
  }, [selectedWatchlistId, instrumentsWithQuotes, watchlists]);

  // Manejar selección de watchlist
  const handleSelectWatchlist = (id: string) => {
    setSelectedWatchlistId(id);
  };

  // Manejar selección de instrumento
  const handleSelectInstrument = (symbol: string) => {
    router.push(`/instrument/${symbol}`);
  };

  // Obtener la watchlist actual
  const currentWatchlist = watchlists.find((w) => w.id === selectedWatchlistId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Watchlists</h1>

        {/* Selector de watchlist */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow p-4 border border-gray-100 dark:border-dark-border">
          <div className="flex flex-wrap gap-2">
            {isLoadingWatchlists ? (
              <div className="p-2">
                <p className="text-gray-500 dark:text-gray-400">Loading watchlists...</p>
              </div>
            ) : watchlists.length > 0 ? (
              watchlists.map((watchlist) => (
                <button
                  key={watchlist.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedWatchlistId === watchlist.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleSelectWatchlist(watchlist.id)}
                >
                  {watchlist.name}
                  {watchlist.isDefault && ' (Default)'}
                </button>
              ))
            ) : (
              <div className="p-2">
                <p className="text-gray-500 dark:text-gray-400">No watchlists found</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabla de instrumentos de la watchlist */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
          <div className="p-4 border-b border-gray-200 dark:border-dark-border">
            <h2 className="text-xl font-semibold">
              {currentWatchlist ? currentWatchlist.name : 'Select a watchlist'}
            </h2>
          </div>

          {isLoadingWatchlists || isLoadingInstruments ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
            </div>
          ) : filteredInstruments.length > 0 ? (
            <InstrumentsTable
              instruments={filteredInstruments}
              onSelectInstrument={handleSelectInstrument}
            />
          ) : currentWatchlist ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No instruments in this watchlist. Add some instruments to get started.
              </p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Select a watchlist to view instruments
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
