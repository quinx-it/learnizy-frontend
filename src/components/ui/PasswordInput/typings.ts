import { type IInputProps } from '@/components/ui/Input/typings';

import { PasswordInput } from './passwordInput';

import type { StoryObj } from '@storybook/nextjs';

export type StoryType = StoryObj<typeof PasswordInput>;

export interface IPasswordInputProps extends IInputProps {
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password';
}
