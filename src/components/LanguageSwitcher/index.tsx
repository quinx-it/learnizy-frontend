'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, type FC } from 'react';

import { Language } from '@/const';

import { Container, DropdownMenu, MenuItem, ToggleButton } from './styles';

const LanguageSwitcher: FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const changeLanguage = (lng: Language) => {
    const lang = lng || Language.En;
    setCookie('language', lang, 365);

    const segments = pathname.split('/').filter(Boolean);
    const allLangs = Object.values(Language);

    if (segments.length > 0 && allLangs.includes(segments[0] as Language)) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }

    router.replace(`/${segments.join('/')}`, { scroll: false });
    router.refresh();
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  return (
    <Container ref={menuRef}>
      <ToggleButton type="button" onClick={() => setOpen((prev) => !prev)}>
        {pathname.split('/')[1]?.toUpperCase() || Language.En.toUpperCase()}
      </ToggleButton>

      <DropdownMenu isOpen={open}>
        <MenuItem type="button" onClick={() => changeLanguage(Language.En)}>
          English
        </MenuItem>
        <MenuItem type="button" onClick={() => changeLanguage(Language.Ru)}>
          Русский
        </MenuItem>
      </DropdownMenu>
    </Container>
  );
};

export default LanguageSwitcher;
