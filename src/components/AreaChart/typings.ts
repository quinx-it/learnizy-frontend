import AreaChart from '.';

import type { StoryObj } from '@storybook/nextjs';

export type StoryType = StoryObj<typeof AreaChart>;

export interface IChartLineProps {
  data?: { day: string; value: number }[];
}
