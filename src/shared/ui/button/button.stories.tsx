import type { Meta } from '@storybook/nextjs';
import { Button } from './button';
import { StoryType } from './typings';

export const meta: Meta<typeof Button> = {
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

export const Blue: StoryType = {};

export const Yellow: StoryType = {
  args: {
    variant: 'yellow',
  },
};

export const White: StoryType = {
  args: {
    variant: 'white',
  },
};
