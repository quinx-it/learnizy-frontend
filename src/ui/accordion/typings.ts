import type { StoryObj } from '@storybook/nextjs';
import { CardAccordion } from './accordion';

export interface IAccordionProps {
  items: IAccordionEntry[];
  className?: string;
}

export interface IAccordionEntry {
  value: string;
  heading: string;
  content: string;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
}

export type StoryType = StoryObj<typeof CardAccordion>;
