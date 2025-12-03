'use client';

import { useTheme } from '@mui/material';
import { FC } from 'react';
import { Area, AreaChart as AreaChartDefault, XAxis, YAxis } from 'recharts';

import { ChartContainer } from '@/components/Chart';

import { IChartLineProps } from './typings';

import { ChartContainerStyled, Container } from './styles';

const chartMargin = { left: 15, right: 15, top: 5, bottom: 245 };

const AreaChart: FC<IChartLineProps> = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) return null;

  const minValue = Math.min(...data.map((item) => item.value));
  const chartDataWithFake = [
    { day: 'fake-start', value: minValue },
    ...data,
    { day: 'fake-end', value: minValue },
  ];

  const primaryColor = theme.palette.primary.main;
  const infoColor = theme.palette.info.main;
  const textPrimaryColor = theme.palette.text.primary;

  return (
    <Container>
      <ChartContainerStyled>
        <ChartContainer
          config={{
            value: {
              label: 'Value',
              color: primaryColor,
            },
          }}
        >
          <AreaChartDefault accessibilityLayer data={chartDataWithFake} margin={chartMargin}>
            <XAxis
              scale="point"
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickFormatter={(value) => (value.startsWith('fake') ? '' : value)}
              tick={{ fill: textPrimaryColor, fontSize: 12 }}
            />
            <YAxis hide domain={['dataMin - 10']} />
            <defs>
              <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="2.74%" stopColor={infoColor} />
                <stop offset="40.29%" stopColor={primaryColor} />
                <stop offset="100%" stopColor={infoColor} />
              </linearGradient>
              <linearGradient id="lineFill" gradientTransform="rotate(90)">
                <stop offset="44.81%" stopColor={primaryColor} stopOpacity={0.3} />
                <stop offset="86.03%" stopColor="rgba(196, 196, 196, 0)" stopOpacity={0} />
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
      </ChartContainerStyled>
    </Container>
  );
};

export default AreaChart;
