import ProgressBar from '.';

import type { StoryObj } from '@storybook/nextjs';

export interface IProgressBarProps {
  value: number;
  className?: string;
  variant?: 'linear' | 'circular';
  size?: number;
  strokeWidth?: number;
}

export type StoryType = StoryObj<typeof ProgressBar>;
