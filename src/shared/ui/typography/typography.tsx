'use client';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { forwardRef } from 'react';
import { IHeadingProps, ITextProps } from './typings';
import { headingVariants, textVariants } from './constants';

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
