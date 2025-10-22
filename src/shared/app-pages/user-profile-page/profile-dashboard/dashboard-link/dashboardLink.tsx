import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ElementType, ReactNode, FC } from 'react';

interface IDashboardLinkProps {
  href: string;
  Icon: ElementType;
  children: ReactNode;
}

export const DashboardLink: FC<IDashboardLinkProps> = (props) => {
  const { href, Icon, children } = props;

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button variant="white" asChild>
      <Link
        href={href}
        className={cn(isActive && 'bg-soft', 'justify-start border-0 !text-[16px]')}
      >
        <Icon className="mr-2.5 h-[20px] w-[20px] text-black" />
        {children}
      </Link>
    </Button>
  );
};
