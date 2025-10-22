'use client';

import { useState, FC } from 'react';
import Link from 'next/link';
import { NavbarLink } from './navbar-link';

import { routes } from '@/shared/constants';

import { HeaderLogo, ExitIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { Text } from '@/shared/ui/typography';
import { useLogout } from '@/shared/hooks/useLogout';
import { ComponentType } from 'react';
import { CubesMainIcon } from '@/shared/ui/icons/cubes-main-icon';
import clsx from 'clsx';

interface ILinkType {
  href: string;
  Icon: ComponentType<{ className?: string }>;
  label: string;
}
interface INavbarProps {
  links: Array<ILinkType>;
}

export const Navbar: FC<INavbarProps> = (props) => {
  const { links } = props;

  const { handleLogout, isLoading } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 right-6 z-30 md:hidden">
        <Button
          variant="blue"
          size="small"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border p-2"
        >
          <CubesMainIcon />
        </Button>
      </div>

      <nav className="bg-light box-shadow z-40 hidden w-[100px] flex-col rounded-e-4xl px-6 py-8 md:flex lg:w-[230px]">
        <Link href={routes.user.homePage} className="mb-15 block">
          <HeaderLogo />
        </Link>
        <div className="flex flex-col gap-6 lg:gap-3">
          {links.map(({ href, Icon, label }) => {
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
            <Spinner type="ring" size={16} className="mx-auto" />
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
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={clsx(
              'bg-light fixed top-0 left-0 z-40 z-50 flex h-full w-[80%] max-w-[200px] transform flex-col items-start justify-start rounded-r-4xl p-6 shadow-lg transition-transform duration-300 md:hidden',
              {
                'translate-x-0': isOpen,
                '-translate-x-full': !isOpen,
              },
            )}
          >
            <Link
              href={routes.user.homePage}
              className="mt-2 block"
              onClick={() => setIsOpen(false)}
            >
              <HeaderLogo />
            </Link>

            <div className="mt-10 flex w-full flex-col gap-3">
              {links.map(({ href, Icon, label }) => (
                <NavbarLink
                  key={label}
                  href={href}
                  Icon={Icon}
                  label={label}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>

            <div className="mt-auto w-full pt-6">
              <Button
                onClick={handleLogout}
                variant="white"
                size="small"
                className="w-full justify-start gap-2.5 border-0 !px-5 !py-2"
              >
                {isLoading ? (
                  <Spinner type="ring" size={16} className="mx-auto" />
                ) : (
                  <>
                    <ExitIcon className="h-[16px] w-[16px]" />
                    <Text variant="s" tag="span" className="text-inherit md:hidden lg:block">
                      Выход
                    </Text>
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
