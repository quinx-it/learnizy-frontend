'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, FC } from 'react';

import { LANGUAGES } from '@/constants';

import { Container, DropdownMenu, MenuItem, ToggleButton } from './styles';

const LanguageSwitcher: FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  const changeLanguage = (lng: LANGUAGES) => {
    const lang = lng || LANGUAGES.EN;
    setCookie('language', lang, 365);

    const segments = pathname.split('/').filter(Boolean);
    const allLangs = Object.values(LANGUAGES);

    if (segments.length > 0 && allLangs.includes(segments[0] as LANGUAGES)) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }

    router.push(`/${segments.join('/')}`);
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
        {pathname.split('/')[1]?.toUpperCase() || LANGUAGES.EN.toUpperCase()}
      </ToggleButton>

      <DropdownMenu isOpen={open}>
        <MenuItem type="button" onClick={() => changeLanguage(LANGUAGES.EN)}>
          English
        </MenuItem>
        <MenuItem type="button" onClick={() => changeLanguage(LANGUAGES.RU)}>
          Русский
        </MenuItem>
      </DropdownMenu>
    </Container>
  );
};

export default LanguageSwitcher;
