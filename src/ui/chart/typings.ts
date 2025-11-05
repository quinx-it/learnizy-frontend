import { ComponentType, ReactNode } from 'react';

import { THEMES } from './chart';

export type ChartConfigType = {
  [k in string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

export type ChartContextPropsType = {
  config: ChartConfigType;
};

export interface IChartStyleProps {
  id: string;
  config: ChartConfigType;
}
