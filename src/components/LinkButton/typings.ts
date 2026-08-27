import { type LinkProps } from '@/components/Link/typings';

export type LinkButtonVariant = 'blue' | 'yellow' | 'outlineLight';

export type LinkButtonSize = 'large' | 'medium';


export type LinkButtonProps = Omit<LinkProps, 'as'> & {
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
};
