import type DatePicker from '.';
import type { StoryObj } from '@storybook/nextjs';

export interface IDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
}

export type StoryType = StoryObj<typeof DatePicker>;
