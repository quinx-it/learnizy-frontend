import type { StoryObj } from '@storybook/nextjs';

import { CustomSelect } from './select';

export interface IOption {
  label: string;
  value: string;
}

export interface ICustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: IOption[];
  placeholder?: string;
  label?: string;
}

export type StoryType = StoryObj<typeof CustomSelect>;
