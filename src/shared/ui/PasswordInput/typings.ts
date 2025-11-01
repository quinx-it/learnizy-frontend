import type { StoryObj } from '@storybook/nextjs';
import { PasswordInput } from './PasswordInput';
import { type IInputProps } from '@/shared/ui/Input/typings';

export type StoryType = StoryObj<typeof PasswordInput>;

export interface IPasswordInputProps extends IInputProps {
  innerClassName?: string;
  autoComplete?: 'current-password' | 'new-password';
}
