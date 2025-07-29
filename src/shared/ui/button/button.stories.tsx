import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'yellow', 'white'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
    variant: 'blue',
    size: 'large',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {};

export const Yellow: Story = {
  args: {
    variant: 'yellow',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
  },
};
