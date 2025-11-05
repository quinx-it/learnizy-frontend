import { Breadcrumbs } from './breadcrumbs';

import type { StoryObj } from '@storybook/nextjs';

export type StoryType = StoryObj<typeof Breadcrumbs>;

export type BreadcrumbItemType = {
  label: string;
  href: string;
};

export interface IBreadcrumbsProps {
  items?: BreadcrumbItemType[];
  className?: string;
  rootLabel?: string;
  rootHref?: string;
  rootDescription?: string;
}
