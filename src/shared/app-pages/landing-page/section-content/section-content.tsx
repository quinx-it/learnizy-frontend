import { cn } from '@/shared/lib/utils';
import React, { ReactNode } from 'react';

interface ISectionContentProps {
  children: ReactNode;
  className?: string;
}

export const SectionContent = ({ children, className }: ISectionContentProps) => {
  return <section className={cn('w-full px-[150px] py-[96px]', className)}>{children}</section>;
};
