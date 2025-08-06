'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { Text } from '@shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { usePathname } from 'next/navigation';

interface HeaderLinkProps extends LinkProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export const HeaderLink = ({ href, icon, label, className }: HeaderLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button variant={isActive ? 'blue' : 'white'} asChild className={className}>
      <Link href={href} className='justify-start gap-2.5 border-0 !px-5 !py-2'>
        {icon}
        <Text variant="s" tag="span" className="hidden text-inherit lg:block">
          {label}
        </Text>
      </Link>
    </Button>
  );
};
