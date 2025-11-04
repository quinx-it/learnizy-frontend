import type { StoryObj } from '@storybook/nextjs';
import { PasswordInput } from './passwordInput';
import { type IInputProps } from '@/ui/input/typings';

export type StoryType = StoryObj<typeof PasswordInput>;

export interface IPasswordInputProps extends IInputProps {
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password';
}
