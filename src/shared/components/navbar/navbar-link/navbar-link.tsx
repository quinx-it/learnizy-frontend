'use client';

import Link, { LinkProps } from 'next/link';
import { ComponentType } from 'react';
import { Text } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { usePathname } from 'next/navigation';

interface NavbarLinkProps extends LinkProps {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  className?: string;
  onClick?: () => void;
}

export const NavbarLink = ({ href, Icon, label, className, onClick }: NavbarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname.split('/').slice(0, 3).join('/') === String(href).split('/').slice(0, 3).join('/');

  return (
    <Button onClick={onClick} variant={isActive ? 'blue' : 'white'} asChild className={className}>
      <Link href={href} className="justify-start gap-2.5 border-0 !px-5 !py-2">
        <Icon className="h-[16px] w-[16px]" />
        <Text variant="s" tag="span" className="text-inherit md:hidden lg:block">
          {label}
        </Text>
      </Link>
    </Button>
  );
};
