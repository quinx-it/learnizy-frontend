'use client';

import Link from 'next/link';
import { NavbarLink } from './navbar-link';

import { constants } from './constants';
import { routes } from '@/shared/constants'

import {
  HeaderLogo,
  ExitIcon,
} from '@shared/ui/icons';


export const Navbar = () => {
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
      <NavbarLink href={routes.loginPage} Icon={ExitIcon} label="Выход" className="mt-auto" />
    </nav>
  );
};
