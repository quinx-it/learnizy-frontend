import { ComponentProps } from 'react';

export interface ITextareaProps extends ComponentProps<'textarea'> {
  error?: string;
  maxLength?: number;
}
