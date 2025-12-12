import { type IInputProps } from '@/components/Input/typings';

import { type PasswordInput } from '.';

import type { StoryObj } from '@storybook/nextjs';

export type StoryType = StoryObj<typeof PasswordInput>;

export interface IPasswordInputProps extends IInputProps {
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password';
}
