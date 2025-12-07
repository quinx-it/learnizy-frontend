import { ComponentType } from 'react';

export interface ILinkType {
  href: string;
  Icon?: ComponentType<{ className?: string }>;
  iconSrc?: string;
  label: string;
}
export interface INavbarProps {
  links: Array<ILinkType>;
}
