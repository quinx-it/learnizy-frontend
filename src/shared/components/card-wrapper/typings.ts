import { PropsWithChildren } from 'react';

export type CardWrapperPropsType = {
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;
