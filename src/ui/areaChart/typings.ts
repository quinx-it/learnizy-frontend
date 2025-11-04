import type { StoryObj } from '@storybook/nextjs';
import { AreaChart } from './areaChart';

export type StoryType = StoryObj<typeof AreaChart>;

export interface IChartLineProps {
  data?: { day: string; value: number }[];
}
