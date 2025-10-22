import { cn } from '@/shared/lib/utils';
import React, { FC, PropsWithChildren } from 'react';

interface ISectionContentProps extends PropsWithChildren {
  className?: string;
}

export const SectionContent: FC<ISectionContentProps> = (props) => {
  const { children, className } = props;

  return <section className={cn('w-full px-[150px] py-[96px]', className)}>{children}</section>;
};
