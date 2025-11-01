import type { StoryObj } from '@storybook/nextjs';
import { ComponentProps } from 'react';
import { Textarea } from './Textarea';

export interface ITextareaProps extends ComponentProps<'textarea'> {
  error?: string;
  maxLength?: number;
}

export type StoryType = StoryObj<typeof Textarea>;
