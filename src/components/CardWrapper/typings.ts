import { type PropsWithChildren } from 'react';

export type CardWrapperPropsType = {
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;
