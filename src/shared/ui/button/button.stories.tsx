import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'third',
        'link',
        'destructive',
        'outline',
      ],
    },
    size: {
      control: 'select',
      options: ['lg', 'text', 'xs', 'm'],
    },
    asChild: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'lg',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    size: 'xs',
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <a href="#" className="inline-flex items-center">
        Link Button <span className="ml-2">→</span>
      </a>
    ),
  },
};
