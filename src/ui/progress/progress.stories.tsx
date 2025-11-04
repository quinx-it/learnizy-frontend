import type { Meta } from '@storybook/nextjs';
import { ProgressBar } from './progress';
import { StoryType } from './typings';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/UI/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Процент выполнения (0–100)',
    },
    variant: {
      control: 'inline-radio',
      options: ['linear', 'circular'],
    },
    size: {
      control: { type: 'number', min: 20, max: 200, step: 4 },
      if: { arg: 'variant', eq: 'circular' },
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      if: { arg: 'variant', eq: 'circular' },
    },
  },
  args: {
    value: 70,
    variant: 'linear',
  },
};

export default meta;

export const Default: StoryType = {};

export const Circular: StoryType = {
  args: {
    variant: 'circular',
    size: 64,
    strokeWidth: 6,
  },
};
