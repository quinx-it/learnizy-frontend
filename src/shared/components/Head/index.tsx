'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { IHeadProps } from './typings';
import { getOgLocale } from '@/shared/utils/getOgLocale';

const Head: FC<IHeadProps> = (props) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const { key = 'DEFAULT', noIndex = false } = props;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const fullUrl = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;

  const ogLocale = getOgLocale();

  return null;
};

export default Head;
