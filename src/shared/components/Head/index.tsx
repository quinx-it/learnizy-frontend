'use client';

import { FC } from 'react';
import HeadBase from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { IHeadProps } from './typings';
import { getOgLocale } from '@/shared/utils/getOgLocale';

const Head: FC<IHeadProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { key = 'DEFAULT', noIndex = false } = props;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';
  const cleanPath = router.asPath.startsWith('/') ? router.asPath.slice(1) : router.asPath;
  const fullUrl = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;

  const ogLocale = getOgLocale();

  return (
    <HeadBase>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content={t(`SEO.${key}.DESCRIPTION`)} />
      <meta name="keywords" content={t(`SEO.${key}.KEYWORDS`)} />
      <meta name="generator" content="Next.js" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {fullUrl && <link rel="canonical" href={fullUrl} />}
      {fullUrl && <link rel="alternate" href={fullUrl} hrefLang="x-default" />}

      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/icons/favicon-16x16.png" type="image/png" sizes="16x16" />
      <link rel="icon" href="/icons/favicon-32x32.png" type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link rel="shortcut icon" href="/icons/favicon.ico" type="image/x-icon" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Learnizy" />
      <meta name="format-detection" content="telephone=no" />

      <meta property="og:title" content={t(`SEO.${key}.OG_TITLE`)} />
      <meta property="og:site_name" content="Learnizy" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:description" content={t(`SEO.${key}.OG_DESCRIPTION`)} />
      <meta property="og:image" content={`${baseUrl}/img/logo.png`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t(`SEO.${key}.OG_TITLE`)} />
      <meta name="twitter:description" content={t(`SEO.${key}.OG_DESCRIPTION`)} />
      <meta name="twitter:image" content={`${baseUrl}/img/logo.png`} />

      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      <title>{t(`SEO.${key}.TITLE`)}</title>
    </HeadBase>
  );
};

export default Head;
export type * from './typings';
