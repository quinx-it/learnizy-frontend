import type meta from './Button.stories';
import type { StoryObj } from '@storybook/nextjs';
import type { ComponentProps } from 'react';

export type ButtonVariant = 'blue' | 'yellow' | 'white' | 'red' | 'green' | 'gray';
export type ButtonSize = 'large' | 'medium' | 'small' | 'icon';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export type StoryType = StoryObj<typeof meta>;
