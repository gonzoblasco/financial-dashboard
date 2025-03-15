'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useInstruments } from '@/hooks/useInstruments';
import { InstrumentsTable } from '@/components/data-display/InstrumentsTable';
import { InstrumentCard } from '@/components/data-display/InstrumentCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Instrument, InstrumentWithQuote } from '@/models/instruments';

export default function InstrumentsPage() {
  const { instrumentsWithQuotes, isLoading, searchInstruments } = useInstruments();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInstruments, setFilteredInstruments] = useState<InstrumentWithQuote[]>([]);
  const [searchResults, setSearchResults] = useState<Instrument[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const router = useRouter();

  // Filtrar por tipo de instrumento
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const instrumentTypes = ['stock', 'crypto', 'forex', 'index', 'commodity'];

  // Efectuar la búsqueda cuando cambia el query
  useEffect(() => {
    const doSearch = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchInstruments(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching instruments:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      doSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchInstruments]);

  // Filtrar instrumentos por tipo
  useEffect(() => {
    if (!selectedType) {
      setFilteredInstruments(instrumentsWithQuotes);
    } else {
      setFilteredInstruments(instrumentsWithQuotes.filter((i) => i.type === selectedType));
    }
  }, [selectedType, instrumentsWithQuotes]);

  // Manejar selección de instrumento
  const handleSelectInstrument = (symbol: string) => {
    router.push(`/instrument/${symbol}`);
  };

  // Manejar cambio de tipo
  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
    setSearchQuery('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Financial Instruments</h1>

        {/* Filtros y búsqueda */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow p-4 border border-gray-100 dark:border-dark-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedType === null
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleTypeChange(null)}
              >
                All
              </button>
              {instrumentTypes.map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleTypeChange(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-grow max-w-md">
                <input
                  type="search"
                  placeholder="Search instruments..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
                  </div>
                )}
              </div>

              <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <button
                  className={`px-3 py-2 ${
                    viewMode === 'table'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setViewMode('table')}
                  title="Table view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75m0 0h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h9.75"
                    />
                  </svg>
                </button>
                <button
                  className={`px-3 py-2 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados de búsqueda */}
        {searchQuery && (
          <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-xl font-semibold">Search Results</h2>
            </div>
            {isSearching ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((instrument) => (
                    <button
                      key={instrument.symbol}
                      className="text-left"
                      onClick={() => handleSelectInstrument(instrument.symbol)}
                    >
                      <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-primary-600 dark:text-primary-400">
                              {instrument.symbol}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {instrument.name}
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            {instrument.type.charAt(0).toUpperCase() + instrument.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No results found</p>
              </div>
            )}
          </div>
        )}

        {/* Lista de instrumentos */}
        {!searchQuery && (
          <div className="bg-white dark:bg-dark-card rounded-lg shadow border border-gray-100 dark:border-dark-border">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-xl font-semibold">
                {selectedType
                  ? `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}s`
                  : 'All Instruments'}
              </h2>
            </div>
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">Loading instruments...</p>
              </div>
            ) : filteredInstruments.length > 0 ? (
              viewMode === 'table' ? (
                <InstrumentsTable
                  instruments={filteredInstruments}
                  onSelectInstrument={handleSelectInstrument}
                />
              ) : (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInstruments.map((instrument) => (
                      <InstrumentCard key={instrument.symbol} instrument={instrument} />
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No instruments found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
