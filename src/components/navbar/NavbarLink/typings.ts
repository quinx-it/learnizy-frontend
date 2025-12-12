import type { LinkProps } from 'next/link';
import type { ComponentType } from 'react';

export interface INavbarLinkProps extends LinkProps {
  src?: string;
  Icon?: ComponentType<{ className?: string }>;
  iconWidth?: number;
  iconHeight?: number;
  label: string;
  className?: string;
  onClick?: () => void;
}
