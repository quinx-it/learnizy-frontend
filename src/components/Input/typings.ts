import { ComponentProps } from 'react';

import { Input } from './input';

import type { StoryObj } from '@storybook/nextjs';

export type StoryType = StoryObj<typeof Input>;

export interface IInputProps extends ComponentProps<'input'> {
  error?: string;
  label?: string;
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password' | 'username' | 'email';
}
