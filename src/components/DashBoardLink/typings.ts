import { type ElementType, type PropsWithChildren } from 'react';

export interface IDashboardLinkProps extends PropsWithChildren {
  href: string;
  src?: string;
  Icon?: ElementType;
  iconWidth?: number;
  iconHeight?: number;
}
