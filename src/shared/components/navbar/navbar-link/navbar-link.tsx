'use client';

import Link, { LinkProps } from 'next/link';
import { ComponentType } from 'react';
import { Text } from '@shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { usePathname } from 'next/navigation';

interface NavbarLinkProps extends LinkProps {
  Icon: ComponentType<{ className?: string }>
  label: string;
  className?: string;
}

export const NavbarLink = ({ href, Icon, label, className }: NavbarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button variant={isActive ? 'blue' : 'white'} asChild className={className}>
      <Link href={href} className='justify-start gap-2.5 border-0 !px-5 !py-2'>
        <Icon className="w-[16px] h-[16px]" />
        <Text variant="s" tag="span" className="hidden text-inherit lg:block">
          {label}
        </Text>
      </Link>
    </Button>
  );
};
