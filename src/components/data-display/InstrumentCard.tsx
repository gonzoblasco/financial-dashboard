'use client';

import { InstrumentWithQuote } from '@/models/instruments';
import Link from 'next/link';

interface InstrumentCardProps {
  instrument: InstrumentWithQuote;
}

export function InstrumentCard({ instrument }: InstrumentCardProps) {
  const { symbol, name, type, quote } = instrument;
  const { price, change, changePercent, volume, marketCap } = quote;

  // Función para formatear grandes cantidades (M, B, T)
  const formatLargeNumber = (num: number | undefined): string => {
    if (!num) return '-';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
  };

  // Determina clases de color según el cambio porcentual
  const changeColorClass =
    changePercent > 0
      ? 'text-green-500 dark:text-green-400'
      : changePercent < 0
        ? 'text-red-500 dark:text-red-400'
        : 'text-gray-500 dark:text-gray-400';

  // Tipo de instrumento formateado
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="bg-white dark:bg-dark-card shadow rounded-lg p-4 border border-gray-100 dark:border-dark-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <Link href={`/instrument/${symbol}`} className="block">
            <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400 hover:underline">
              {symbol}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{name}</p>
          <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {formattedType}
          </span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className={`text-sm font-medium ${changeColorClass}`}>
            {change > 0 ? '+' : ''}
            {change.toFixed(2)} ({changePercent > 0 ? '+' : ''}
            {changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {formatLargeNumber(volume)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {formatLargeNumber(marketCap)}
          </p>
        </div>
      </div>
    </div>
  );
}
