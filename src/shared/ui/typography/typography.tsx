'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
const headingVariants = cva('font-nunito leading-normal transition-colors', {
  variants: {
    variant: {
      'minor-6xl':
        'text-[32px] sm:text-[40px] md:text-[44px] leading-9 sm:leading-12.5 md:leading-13 font-normal',
      'minor-5xl':
        'text-[32px] sm:text-[32px] md:text-[40px] leading-9 sm:leading-10 md:leading-12.5 font-normal',
      'minor-4xl': 'text-[24px] leading-[26px] font-normal',
      'minor-3xl': 'text-[28px] sm:text-[32px] leading-8 sm:leading-10 font-normal',
      'minor-2xl': 'text-[24px] sm:text-[28px] leading-6.5 sm:leading-8 font-normal',
      'minor-xl':
        'text-[16px] sm:text-[20px] md:text-[24px] leading-4.5 sm:leading-5.5 md:leading-6.5 font-normal',
    },
  },
  defaultVariants: {
    variant: 'minor-6xl',
  },
});

const textVariants = cva('font-nunito leading-normal transition-colors', {
  variants: {
    variant: {
      'l-20': 'text-[16px] md:text-[20px] leading-4.5 md:leading-5.5 font-normal',
      'm-16': 'text-[12px] md:text-[16px] leading-4 md:leading-4.5 font-normal',
      'xs-12': 'text-[12px] leading-4 font-normal',
      's-14': 'text-[14px] leading-[17px] font-normal',
    },
  },
  defaultVariants: {
    variant: 'm-16',
  },
});

type HeadingVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextVariants = 'p' | 'span';

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  tag?: HeadingVariants;
}

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  tag?: TextVariants;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ tag = 'h3', variant, children, className, ...props }, ref) => {
    const Tag = tag;
    return (
      <Tag className={cn(headingVariants({ variant, className }))} ref={ref} {...props}>
        {children}
      </Tag>
    );
  },
);

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
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
