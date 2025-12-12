import { type PropsWithChildren } from 'react';

export interface IAnalyticsCardProps extends PropsWithChildren {
  title: string;
  value?: number;
  changePercentage?: number;
}
