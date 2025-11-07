'use client';

import { useState, useEffect, useRef, FC } from 'react';

import { DEFAULT_LANGUAGE } from '@/constants';

const i18n = {
  changeLanguage: (label: string) => label,
  language: 'ru',
};

const LanguageSwitcher: FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  const getCookie = (name: string) => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];
  };

  const changeLanguage = (lng: string) => {
    const lang = lng || DEFAULT_LANGUAGE;
    i18n.changeLanguage(lang);
    setCookie('language', lang, 365);
    setOpen(false);
  };

  useEffect(() => {
    const savedLang = getCookie('language');

    if (savedLang) {
      i18n.changeLanguage(savedLang);
    } else {
      i18n.changeLanguage(DEFAULT_LANGUAGE);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative flex w-full justify-end pr-4" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
      >
        {i18n.language?.toUpperCase() || DEFAULT_LANGUAGE.toUpperCase()}
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
          onClick={() => changeLanguage('en')}
          className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
        >
          English
        </button>
        <button
          type="button"
          onClick={() => changeLanguage('ru')}
          className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
        >
          Русский
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
