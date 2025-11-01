import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import { headingVariants, textVariants } from './constants';
import type { StoryObj } from '@storybook/nextjs';
import { Heading, Text } from './Typography';

export type HeadingVariantsType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextVariantsType = 'p' | 'span';

export type HeadingStoryType = StoryObj<typeof Heading>;
export type TextStoryType = StoryObj<typeof Text>;

export interface IHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  tag?: HeadingVariantsType;
}

export interface ITextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  tag?: TextVariantsType;
}
