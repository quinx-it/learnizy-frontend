import { type ComponentProps } from 'react';

import type Input from '.';
import type { StoryObj } from '@storybook/nextjs';

export type StoryType = StoryObj<typeof Input>;

export interface IInputProps extends ComponentProps<'input'> {
  error?: string;
  label?: string;
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password' | 'username' | 'email';
}
