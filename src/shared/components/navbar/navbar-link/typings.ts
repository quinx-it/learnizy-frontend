import { LinkProps } from 'next/link';
import { ComponentType } from 'react';

export interface INavbarLinkProps extends LinkProps {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  className?: string;
  onClick?: () => void;
}
