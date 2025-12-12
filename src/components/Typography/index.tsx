'use client';

import { forwardRef } from 'react';

import { type IHeadingProps, type ITextProps } from './typings';

import { StyledHeading, StyledText } from './styles';

const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>(
  ({ tag = 'h3', variant = 'xl', children, className, ...props }, ref) => {
    const StyledComponent = StyledHeading.withComponent(tag);

    return (
      <StyledComponent variant={variant || 'xl'} className={className} ref={ref} {...props}>
        {children}
      </StyledComponent>
    );
  },
);

const Text = forwardRef<HTMLParagraphElement, ITextProps>(
  ({ tag = 'p', variant = 's', children, className, ...props }, ref) => {
    const StyledComponent = StyledText.withComponent(tag);

    return (
      <StyledComponent variant={variant || 's'} className={className} ref={ref} {...props}>
        {children}
      </StyledComponent>
    );
  },
);

Heading.displayName = 'Heading';
Text.displayName = 'Text';

export { Heading, Text };
