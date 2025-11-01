import type { StoryObj } from '@storybook/nextjs';
import { Input } from './Input';
import { ComponentProps } from 'react';

export type StoryType = StoryObj<typeof Input>;

export interface IInputProps extends ComponentProps<'input'> {
  error?: string;
  label?: string;
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password' | 'username' | 'email';
}
