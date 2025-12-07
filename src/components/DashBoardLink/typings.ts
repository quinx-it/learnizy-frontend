import { ElementType, PropsWithChildren } from 'react';

export interface IDashboardLinkProps extends PropsWithChildren {
  href: string;
  iconSrc?: string;
  Icon?: ElementType;
  iconWidth?: number;
  iconHeight?: number;
}
