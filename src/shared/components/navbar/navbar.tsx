'use-client';

import Link from 'next/link';
import { NavbarLink } from './navbar-link';

import {
  HeaderLogo,
  ProjectsIcon,
  APlusIcon,
  CubesMainIcon,
  DiscussionIcon,
  ExitIcon,
  PersonIcon,
  StudentHatIcon,
} from '@shared/ui/icons';

const links = [
  {
    href: '/',
    icon: <CubesMainIcon />,
    label: 'Главная',
  },
  {
    href: '/modules',
    icon: <StudentHatIcon />,
    label: 'Модули',
  },
  {
    href: '/learn-base',
    icon: <DiscussionIcon />,
    label: 'База знаний',
  },
  {
    href: '/exams',
    icon: <APlusIcon />,
    label: 'Экзамены',
  },
  {
    href: '/projects',
    icon: <ProjectsIcon />,
    label: 'Проекты',
  },
  {
    href: '/user-profile',
    icon: <PersonIcon />,
    label: 'Профиль',
  },
];

export const Navbar = () => {
  return (
    <nav className="bg-light box-shadow hidden w-[100px] flex-col rounded-e-4xl px-6 py-8 md:flex lg:w-[230px]">
      <Link href="#" className="mb-15 block">
        <HeaderLogo />
      </Link>
      <div className="flex flex-col gap-6 lg:gap-3">
        {links.map(({ href, icon, label }) => {
          return <NavbarLink key={label} href={href} icon={icon} label={label} />;
        })}
      </div>
      <NavbarLink href="#" icon={<ExitIcon />} label="Выход" className="mt-auto" />
    </nav>
  );
};
