'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Text } from '@/ui/typography';
import { Button } from '@/ui/button';
import { usePathname } from 'next/navigation';
import { INavbarLinkProps } from './typings';

export const NavbarLink: FC<INavbarLinkProps> = (props) => {
  const { href, Icon, label, className, onClick } = props;

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
