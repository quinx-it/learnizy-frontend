import type { StoryObj } from '@storybook/nextjs';
import { DatePicker } from './datePicker';

export interface IDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
}

export type StoryType = StoryObj<typeof DatePicker>;
