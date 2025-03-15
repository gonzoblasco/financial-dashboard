'use client';

import { TimeFrame } from '@/models/marketData';
import { useCallback } from 'react';

interface TimeframeSelectorProps {
  selectedTimeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  availableTimeframes?: TimeFrame[];
}

// Mapeo para mostrar los nombres más amigables
const timeframeLabels: Record<TimeFrame, string> = {
  '1m': '1m',
  '5m': '5m',
  '15m': '15m',
  '30m': '30m',
  '1h': '1h',
  '4h': '4h',
  '1d': '1D',
  '1w': '1W',
  '1M': '1M',
};

export function TimeframeSelector({
  selectedTimeframe,
  onTimeframeChange,
  availableTimeframes = ['1d', '1w', '1M'],
}: TimeframeSelectorProps) {
  const handleTimeframeChange = useCallback(
    (timeframe: TimeFrame) => {
      onTimeframeChange(timeframe);
    },
    [onTimeframeChange]
  );

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {availableTimeframes.map((timeframe) => (
        <button
          key={timeframe}
          type="button"
          className={`px-4 py-2 text-sm font-medium
            ${
              selectedTimeframe === timeframe
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }
            ${
              timeframe === availableTimeframes[0]
                ? 'rounded-l-md'
                : timeframe === availableTimeframes[availableTimeframes.length - 1]
                  ? 'rounded-r-md'
                  : ''
            }
            border border-gray-200 dark:border-gray-600
          `}
          onClick={() => handleTimeframeChange(timeframe)}
          aria-current={selectedTimeframe === timeframe ? 'page' : undefined}
        >
          {timeframeLabels[timeframe]}
        </button>
      ))}
    </div>
  );
}
