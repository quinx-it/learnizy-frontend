import { type ComponentProps } from 'react';

import type Textarea from '.';
import type { StoryObj } from '@storybook/nextjs';

export interface ITextareaProps extends ComponentProps<'textarea'> {
  error?: string;
  maxLength?: number;
}

export type StoryType = StoryObj<typeof Textarea>;
