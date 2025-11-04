'use client';

import { Area, AreaChart as AreaChartDefault, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/ui/chart';
import { IChartLineProps } from './typings';

const chartMargin = { left: 15, right: 15, top: 5, bottom: 0 };

export function AreaChart({ data }: IChartLineProps) {
  if (!data || data.length === 0) return null;

  const minValue = Math.min(...data.map((item) => item.value));
  const chartDataWithFake = [
    { day: 'fake-start', value: minValue },
    ...data,
    { day: 'fake-end', value: minValue },
  ];

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <ChartContainer
        config={{
          value: {
            label: 'Value',
            color: 'hsl(var(--chart-1))',
          },
        }}
        className="max-h-[180px] w-full min-w-[500px]"
      >
        <AreaChartDefault accessibilityLayer data={chartDataWithFake} margin={chartMargin}>
          <XAxis
            scale="point"
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            tickFormatter={(value) => (value.startsWith('fake') ? '' : value)}
          />
          <YAxis hide domain={['dataMin - 10']} />
          <defs>
            <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="2.74%" stopColor="#C9E1E8" />
              <stop offset="40.29%" stopColor="#248EAB" />
              <stop offset="100%" stopColor="#C9E1E8" />
            </linearGradient>
            <linearGradient id="lineFill" gradientTransform="rotate(90)">
              <stop offset="44.81%" stopColor="#248EAB" stopOpacity={0.3} />
              <stop offset="86.03%" stopColor="#C4C4C400" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="bump"
            dataKey="value"
            strokeWidth={4}
            stroke="url(#lineStroke)"
            fill="url(#lineFill)"
          />
        </AreaChartDefault>
      </ChartContainer>
    </div>
  );
}
