'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, FC } from 'react';

import { LANGUAGES } from '@/constants';

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

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleClickOutside);
  }

  return (
    <div className="relative flex w-full justify-end pr-4" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
      >
        {pathname.split('/')[1]?.toUpperCase() || LANGUAGES.EN.toUpperCase()}
      </button>

      <div
        className={`absolute right-4 mt-2 w-28 rounded-md border border-gray-200 bg-white shadow-md transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => changeLanguage(LANGUAGES.EN)}
          className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
        >
          English
        </button>
        <button
          type="button"
          onClick={() => changeLanguage(LANGUAGES.RU)}
          className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
        >
          Русский
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
