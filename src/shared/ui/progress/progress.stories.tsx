import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBar } from './progress';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/UI/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Процент выполнения (0–100)',
    },
  },
  args: {
    value: 70,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};
