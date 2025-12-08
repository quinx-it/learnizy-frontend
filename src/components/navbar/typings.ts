import { ComponentType } from 'react';

export interface ILinkType {
  href: string;
  Icon?: ComponentType<{ className?: string }>;
  src?: string;
  label: string;
}
export interface INavbarProps {
  links: Array<ILinkType>;
}
