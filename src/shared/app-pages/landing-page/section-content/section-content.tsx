import { cn } from '@/shared/lib/utils';
import React, { ReactNode, FC } from 'react';

interface ISectionContentProps {
  children: ReactNode;
  className?: string;
}

export const SectionContent: FC<ISectionContentProps> = (props) => {
  const { children, className } = props;
  return <section className={cn('w-full px-[150px] py-[96px]', className)}>{children}</section>;
};
