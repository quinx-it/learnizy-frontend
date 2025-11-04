import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { ISectionContentProps } from './typings';

export const SectionContent: FC<ISectionContentProps> = (props) => {
  const { children, className } = props;

  return <section className={cn('w-full px-[150px] py-[96px]', className)}>{children}</section>;
};
