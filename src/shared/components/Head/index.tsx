import { FC } from 'react';
import HeadBase from 'next/head';
import { IHeadProps } from './typings';
import { useTranslation } from 'react-i18next';

const Head: FC<IHeadProps> = (props) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ru';

  const localized = props.seo?.[currentLang] ?? props;

  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    noIndex = false,
    fullUrl,
    baseUrLClean,
    ogLocale,
  } = localized;

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

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

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
      <meta name="apple-mobile-web-app-title" content="Best Spin" />
      <meta name="format-detection" content="telephone=no" />

      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:site_name" content="Best Spin" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:description" content={ogDescription ?? description} />
      <meta property="og:image" content={`${baseUrLClean}/img/logo.png`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle ?? title} />
      <meta name="twitter:description" content={ogDescription ?? description} />
      <meta name="twitter:image" content={`${baseUrLClean}/img/logo.png`} />

      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      <title>{title}</title>
    </HeadBase>
  );
};

export default Head;
