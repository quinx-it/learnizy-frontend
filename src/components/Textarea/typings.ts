import { ComponentProps } from 'react';

import { Textarea } from './textarea';

import type { StoryObj } from '@storybook/nextjs';

export interface ITextareaProps extends ComponentProps<'textarea'> {
  error?: string;
  maxLength?: number;
}

export type StoryType = StoryObj<typeof Textarea>;
