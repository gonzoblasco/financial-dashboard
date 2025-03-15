'use client';

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ReferenceLine,
} from 'recharts';
import { OHLCV } from '@/models/marketData';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface CandlestickChartProps {
  data: OHLCV[];
  height?: number | string;
  showVolume?: boolean;
  showCrosshair?: boolean;
}

export function CandlestickChart({
  data,
  height = 400,
  showVolume = true,
  showCrosshair = true,
}: CandlestickChartProps) {
  const { actualTheme } = useTheme();
  const [crosshairValues, setCrosshairValues] = useState<{ x: number; y: number } | null>(null);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

  // Calculamos el mínimo y máximo para el dominio del eje Y
  const minValue = Math.min(...data.map((d) => d.low)) * 0.998;
  const maxValue = Math.max(...data.map((d) => d.high)) * 1.002;

  // Colores para las velas según el tema
  const colors = {
    up: actualTheme === 'dark' ? '#22c55e' : '#16a34a',
    down: actualTheme === 'dark' ? '#ef4444' : '#dc2626',
    tooltip: actualTheme === 'dark' ? '#1e1e1e' : '#ffffff',
    grid: actualTheme === 'dark' ? '#2e2e2e' : '#e5e7eb',
    volume: {
      up: actualTheme === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(22, 163, 74, 0.3)',
      down: actualTheme === 'dark' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.3)',
    },
  };

  // Transformar datos para el gráfico
  const chartData = data.map((item) => ({
    ...item,
    // Para las barras de velas
    wickTop: item.open > item.close ? item.open : item.close,
    wickBottom: item.open < item.close ? item.open : item.close,
    candleHeight: Math.abs(item.open - item.close),
    // Dirección de la vela
    isUp: item.close >= item.open,
    // Para el volumen
    volumeColor: item.close >= item.open ? colors.volume.up : colors.volume.down,
    color: item.close >= item.open ? colors.up : colors.down,
    // Para tooltip y formato
    formattedDate: new Date(item.timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    }),
  }));

  // Formato para los valores del eje X
  const formatXAxis = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  // Formato para el tooltip
  const formatTooltip = (value: number) => {
    return value.toFixed(2);
  };

  // Normalizamos los valores del volumen para que se vean bien en el gráfico
  const maxVolume = Math.max(...data.map((d) => d.volume));
  const volumeScale = ((maxValue - minValue) * 0.2) / maxVolume;

  // Manejador para el movimiento del mouse en el gráfico
  const handleMouseMove = useCallback((e: any) => {
    if (e && e.activeTooltipIndex !== undefined) {
      setActiveTooltipIndex(e.activeTooltipIndex);
    }
  }, []);

  // Manejador para cuando el mouse sale del gráfico
  const handleMouseLeave = useCallback(() => {
    setActiveTooltipIndex(null);
    setCrosshairValues(null);
  }, []);

  // Actualizamos el crosshair cuando cambia el tooltip activo
  useEffect(() => {
    if (activeTooltipIndex !== null && chartData[activeTooltipIndex]) {
      const item = chartData[activeTooltipIndex];
      setCrosshairValues({
        x: item.timestamp,
        y: item.close,
      });
    } else {
      setCrosshairValues(null);
    }
  }, [activeTooltipIndex, chartData]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={colors.grid}
          strokeOpacity={0.5}
          vertical={false}
        />
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
          domain={[minValue, maxValue]}
          tick={{ fontSize: 12 }}
          tickCount={6}
          width={60}
          tickFormatter={(value) => value.toFixed(0)}
        />
        <Tooltip
          labelFormatter={(label) =>
            new Date(Number(label)).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          }
          formatter={(value: number, name: string) => {
            const formattedValue = formatTooltip(value);
            switch (name) {
              case 'high':
                return [formattedValue, 'High'];
              case 'low':
                return [formattedValue, 'Low'];
              case 'open':
                return [formattedValue, 'Open'];
              case 'close':
                return [formattedValue, 'Close'];
              case 'volume':
                return [Number(value).toLocaleString(), 'Volume'];
              default:
                return [formattedValue, name];
            }
          }}
          contentStyle={{
            backgroundColor: colors.tooltip,
            borderRadius: '4px',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        />

        {/* Volumen */}
        {showVolume && (
          <Bar
            dataKey="volume"
            fill="rgba(100, 100, 100, 0.3)"
            barSize={2}
            yAxisId="volume"
            shape={(props) => {
              const { x, y, width, height, volumeColor } = props;
              return (
                <rect x={x} y={y} width={width} height={height} fill={volumeColor} stroke="none" />
              );
            }}
          />
        )}

        {/* Barras de las velas */}
        <Bar
          dataKey="candleHeight"
          fill="rgba(0, 0, 0, 0)"
          stroke="none"
          shape={(props) => {
            const { fill, x, y, width, height, color, isUp, wickTop, wickBottom, high, low } =
              props;
            const wickX = x + width / 2;

            return (
              <g>
                {/* Mecha superior */}
                <line
                  x1={wickX}
                  y1={y - (high - wickTop)}
                  x2={wickX}
                  y2={y}
                  stroke={color}
                  strokeWidth={1}
                />
                {/* Cuerpo de la vela */}
                <rect x={x} y={y} width={width} height={height} fill={color} stroke={color} />
                {/* Mecha inferior */}
                <line
                  x1={wickX}
                  y1={y + height}
                  x2={wickX}
                  y2={y + height + (wickBottom - low)}
                  stroke={color}
                  strokeWidth={1}
                />
              </g>
            );
          }}
        />

        {/* Líneas para datos OHLC */}
        <Line type="monotone" dataKey="high" dot={false} visibility="hidden" />
        <Line type="monotone" dataKey="low" dot={false} visibility="hidden" />
        <Line type="monotone" dataKey="open" dot={false} visibility="hidden" />
        <Line type="monotone" dataKey="close" dot={false} visibility="hidden" />

        {/* Líneas de referencia para crosshair */}
        {showCrosshair && crosshairValues && (
          <>
            <ReferenceLine
              x={crosshairValues.x}
              stroke="#888"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <ReferenceLine
              y={crosshairValues.y}
              stroke="#888"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{
                value: formatTooltip(crosshairValues.y),
                position: 'right',
                offset: 5,
              }}
            />
          </>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
