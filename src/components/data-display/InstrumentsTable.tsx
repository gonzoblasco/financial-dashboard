'use client';

import { InstrumentWithQuote } from '@/models/instruments';
import { useState } from 'react';
import Link from 'next/link';

interface InstrumentsTableProps {
  instruments: InstrumentWithQuote[];
  onSelectInstrument?: (symbol: string) => void;
}

export function InstrumentsTable({ instruments, onSelectInstrument }: InstrumentsTableProps) {
  const [sortField, setSortField] = useState<
    keyof InstrumentWithQuote | 'quote.price' | 'quote.changePercent'
  >('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Función para cambiar el ordenamiento
  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Función para ordenar los instrumentos
  const sortedInstruments = [...instruments].sort((a, b) => {
    let valueA, valueB;

    // Manejar campos anidados
    if (sortField === 'quote.price') {
      valueA = a.quote.price;
      valueB = b.quote.price;
    } else if (sortField === 'quote.changePercent') {
      valueA = a.quote.changePercent;
      valueB = b.quote.changePercent;
    } else {
      valueA = a[sortField as keyof InstrumentWithQuote];
      valueB = b[sortField as keyof InstrumentWithQuote];
    }

    // Ordenar
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Función para formatear números con separador de miles
  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Función para formatear grandes cantidades (M, B, T)
  const formatLargeNumber = (num: number): string => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return formatNumber(num);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('symbol')}
            >
              Symbol
              {sortField === 'symbol' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name
              {sortField === 'name' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('quote.price')}
            >
              Price
              {sortField === 'quote.price' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('quote.changePercent')}
            >
              Change %
              {sortField === 'quote.changePercent' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Market Cap
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Volume
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
          {sortedInstruments.map((instrument) => (
            <tr
              key={instrument.symbol}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => onSelectInstrument?.(instrument.symbol)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 dark:text-primary-400">
                <Link href={`/instrument/${instrument.symbol}`}>{instrument.symbol}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {instrument.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800 dark:text-gray-200">
                {formatNumber(instrument.quote.price)}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                  instrument.quote.changePercent > 0
                    ? 'text-green-600 dark:text-green-400'
                    : instrument.quote.changePercent < 0
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {instrument.quote.changePercent > 0 ? '+' : ''}
                {instrument.quote.changePercent.toFixed(2)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                {instrument.quote.marketCap ? formatLargeNumber(instrument.quote.marketCap) : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                {formatLargeNumber(instrument.quote.volume)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
