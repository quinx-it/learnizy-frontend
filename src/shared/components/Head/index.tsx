import { FC } from 'react';
import HeadBase from 'next/head';
import { IHeadProps } from './typings';
import { useTranslation } from 'react-i18next';
import { getOgLocale } from '@/shared/utils/getOgLocale';

const Head: FC<IHeadProps> = ({ key = 'DEFAULT', ...props }) => {
  const { t } = useTranslation();

  const seoKeyToUse = key;

  const {
    fullUrl = 'https://learnizy-frontend.vercel.app',
    baseUrlClean = 'https://learnizy-frontend.vercel.app',
    noIndex = false,
  } = props;

  const title = t(`SEO.${seoKeyToUse}.TITLE`);
  const description = t(`SEO.${seoKeyToUse}.DESCRIPTION`);
  const keywords = t(`SEO.${seoKeyToUse}.KEYWORDS`);
  const ogTitle = t(`SEO.${seoKeyToUse}.OG_TITLE`);
  const ogDescription = t(`SEO.${seoKeyToUse}.OG_DESCRIPTION`);
  const ogLocale = getOgLocale();

  return (
    <HeadBase>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
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

      <meta property="og:title" content={ogTitle} />
      <meta property="og:site_name" content="Learnizy" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={`${baseUrlClean}/img/logo.png`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={`${baseUrlClean}/img/logo.png`} />

      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      <title>{title}</title>
    </HeadBase>
  );
};

export default Head;
