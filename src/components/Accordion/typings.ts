import CardAccordion from '.';

import type { StoryObj } from '@storybook/nextjs';

export interface IAccordionEntry {
  value: string;
  heading: string;
  content: string;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
}

export interface IAccordionProps {
  items: IAccordionEntry[];
  className?: string;
}

export type StoryType = StoryObj<typeof CardAccordion>;
