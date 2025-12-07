import { LinkProps } from 'next/link';
import { ComponentType } from 'react';

export interface INavbarLinkProps extends LinkProps {
  iconSrc?: string;
  Icon?: ComponentType<{ className?: string }>;
  iconWidth?: number;
  iconHeight?: number;
  label: string;
  className?: string;
  onClick?: () => void;
}
