'use client';

import Link from 'next/link';
import { NavbarLink } from './navbar-link';

import { constants } from './constants';
import { routes } from '@/shared/constants';

import { HeaderLogo, ExitIcon } from '@shared/ui/icons';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { Text } from '@/shared/ui/typography';
import { useLogout } from '@/shared/hooks/useLogout';

export const Navbar = () => {
 const { handleLogout, isLoading } = useLogout();

  return (
    <nav className="bg-light box-shadow hidden w-[100px] flex-col rounded-e-4xl px-6 py-8 md:flex lg:w-[230px]">
      <Link href={routes.homePage} className="mb-15 block">
        <HeaderLogo />
      </Link>
      <div className="flex flex-col gap-6 lg:gap-3">
        {constants.links.map(({ href, Icon, label }) => {
          return <NavbarLink key={label} href={href} Icon={Icon} label={label} />;
        })}
      </div>
      <Button
        onClick={handleLogout}
        variant="white"
        size="small"
        className="mt-auto justify-start gap-2.5 border-0 !px-5 !py-2"
      >
        {isLoading ? (
          <Spinner type='ring' size={16} className="mx-auto" />
        ) : (
          <>
            <ExitIcon className="h-[16px] w-[16px]" />
            <Text variant="s" tag="span" className="hidden text-inherit lg:block">
              Выход
            </Text>
          </>
        )}
      </Button>
    </nav>
  );
};
