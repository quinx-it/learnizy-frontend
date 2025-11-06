'use client';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { headingVariants, textVariants } from './constants';
import { IHeadingProps, ITextProps } from './typings';

const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>(
  ({ tag = 'h3', variant, children, className, ...props }, ref) => {
    const Tag = tag;

    return (
      <Tag className={cn(headingVariants({ variant, className }))} ref={ref} {...props}>
        {children}
      </Tag>
    );
  },
);

const Text = forwardRef<HTMLParagraphElement, ITextProps>(
  ({ tag = 'p', variant, children, className, ...props }, ref) => {
    const Tag = tag;

    return (
      <Tag className={cn(textVariants({ variant, className }))} ref={ref} {...props}>
        {children}
      </Tag>
    );
  },
);

Heading.displayName = 'Heading';
Text.displayName = 'Text';

export { Heading, Text };
