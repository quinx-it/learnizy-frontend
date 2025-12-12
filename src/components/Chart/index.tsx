'use client';

import {
  type FC,
  type ComponentProps,
  createContext,
  type CSSProperties,
  useContext,
  useId,
  useMemo,
} from 'react';
import * as RechartsPrimitive from 'recharts';

import { type ChartConfigType, type ChartContextPropsType, type IChartStyleProps } from './typings';

import {
  LegendContainer,
  LegendIndicator,
  LegendItem,
  StyledChartContainer,
  TooltipContainer,
  TooltipContentWrapper,
  TooltipIndicator,
  TooltipItemContent,
  TooltipItemLabel,
  TooltipItemLabelWrapper,
  TooltipItemValue,
  TooltipItemWrapper,
  TooltipLabel,
} from './styles';

export const enum ChartTheme {
  Light = 'Light',
  Dark = 'Dark',
}

export const THEMES = {
  [ChartTheme.Light]: '',
  [ChartTheme.Dark]: '.dark',
};

const ChartContext = createContext<ChartContextPropsType | null>(null);

const useChart = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
};

const getPayloadConfigFromPayload = (config: ChartConfigType, payload: unknown, key: string) => {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
};

const ChartStyle: FC<IChartStyleProps> = (props) => {
  const { id, config } = props;

  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
              ${prefix} [data-chart=${id}] {
                ${colorConfig
                  .map(([key, itemConfig]) => {
                    const color = itemConfig.theme?.[theme as ChartTheme] || itemConfig.color;

                    return color ? `  --color-${key}: ${color};` : null;
                  })
                  .join('\n')}
              }
              `,
          )
          .join('\n'),
      }}
    />
  );
};

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: ComponentProps<'div'> & {
  config: ChartConfigType;
  children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  const memoizedValue = useMemo(() => ({ config }), [config]);

  return (
    <ChartContext.Provider value={memoizedValue}>
      <StyledChartContainer data-slot="chart" data-chart={chartId} className={className} {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </StyledChartContainer>
    </ChartContext.Provider>
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ComponentProps<typeof RechartsPrimitive.Tooltip> &
  ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <TooltipLabel className={labelClassName}>{labelFormatter(value, payload)}</TooltipLabel>
      );
    }

    if (!value) {
      return null;
    }

    return <TooltipLabel className={labelClassName}>{value}</TooltipLabel>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <TooltipContainer className={className}>
      {!nestLabel ? tooltipLabel : null}
      <TooltipContentWrapper>
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <TooltipItemWrapper key={item.dataKey} indicator={indicator}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <TooltipIndicator
                        indicator={indicator}
                        nestLabel={nestLabel}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor,
                          } as CSSProperties
                        }
                      />
                    )
                  )}
                  <TooltipItemContent nestLabel={nestLabel}>
                    <TooltipItemLabelWrapper>
                      {nestLabel ? tooltipLabel : null}
                      <TooltipItemLabel>{itemConfig?.label || item.name}</TooltipItemLabel>
                    </TooltipItemLabelWrapper>
                    {item.value && (
                      <TooltipItemValue>{item.value.toLocaleString()}</TooltipItemValue>
                    )}
                  </TooltipItemContent>
                </>
              )}
            </TooltipItemWrapper>
          );
        })}
      </TooltipContentWrapper>
    </TooltipContainer>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: ComponentProps<'div'> &
  Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <LegendContainer verticalAlign={verticalAlign} className={className}>
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <LegendItem key={item.value}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <LegendIndicator
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </LegendItem>
        );
      })}
    </LegendContainer>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
