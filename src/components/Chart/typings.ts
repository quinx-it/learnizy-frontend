import { type ComponentType, type ReactNode } from 'react';

import { type ChartTheme } from '.';

export type ChartConfigType = {
  [k in string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<ChartTheme, string> });
};

export type ChartContextPropsType = {
  config: ChartConfigType;
};

export interface IChartStyleProps {
  id: string;
  config: ChartConfigType;
}
