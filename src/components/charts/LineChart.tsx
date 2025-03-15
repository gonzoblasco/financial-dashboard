'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { OHLCV } from '@/models/marketData';

interface LineChartProps {
  data: OHLCV[];
  height?: number | string;
  colors?: {
    line?: string;
    grid?: string;
    tooltip?: string;
  };
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
}

export function LineChart({
  data,
  height = 400,
  colors = {
    line: '#0ea5e9',
    grid: '#e5e7eb',
    tooltip: '#ffffff',
  },
  showGrid = true,
  showTooltip = true,
  showLegend = false,
}: LineChartProps) {
  // Formateador para fechas en el eje X
  const formatXAxis = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  // Formateador para el tooltip
  const formatTooltip = (value: number) => {
    return value.toFixed(2);
  };

  // Datos transformados para Recharts
  const chartData = data.map((item) => ({
    timestamp: item.timestamp,
    price: item.close,
    formattedDate: formatXAxis(item.timestamp),
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            strokeOpacity={0.5}
            vertical={false}
          />
        )}
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatXAxis}
          type="number"
          domain={['dataMin', 'dataMax']}
          tick={{ fontSize: 12 }}
          tickCount={6}
          minTickGap={20}
        />
        <YAxis
          domain={['auto', 'auto']}
          tick={{ fontSize: 12 }}
          tickCount={6}
          width={60}
          tickFormatter={(value) => value.toFixed(0)}
        />
        {showTooltip && (
          <Tooltip
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            }
            formatter={(value: number) => [formatTooltip(value), 'Price']}
            contentStyle={{
              backgroundColor: colors.tooltip,
              borderRadius: '4px',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          />
        )}
        {showLegend && <Legend />}
        <Line
          type="monotone"
          dataKey="price"
          stroke={colors.line}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
          animationDuration={500}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
