import { Spinner } from './spinner';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Spinner> = {
  title: 'Components/UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ring'],
    },
    size: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
  args: {
    variant: 'ring',
    size: 150,
    color: '#00617B',
  },
};

export default meta;
type StoryType = StoryObj<typeof Spinner>;

export const Default: StoryType = {};
