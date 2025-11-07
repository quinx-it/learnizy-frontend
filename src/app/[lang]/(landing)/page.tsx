import { Metadata } from 'next';
import { FC } from 'react';

import { LandingPage } from '@/components/LandingPage';
import { getOgLocale, getBaseUrl, getFullUrl } from '@/utils';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = (label: string) => label;

  const key = 'MAIN_PAGE_SEO';
  const ogLocale = getOgLocale();
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl('/');

  const noIndex = false;

  return {
    title: t(`SEO.${key}.TITLE`),
    description: t(`SEO.${key}.DESCRIPTION`),
    keywords: t(`SEO.${key}.KEYWORDS`),
    alternates: {
      canonical: fullUrl,
      languages: {
        'x-default': fullUrl,
      },
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: t(`SEO.${key}.OG_TITLE`),
      description: t(`SEO.${key}.OG_DESCRIPTION`),
      images: [`${baseUrl}/img/logo.png`],
      locale: ogLocale,
    },
    twitter: {
      title: t(`SEO.${key}.OG_TITLE`),
      description: t(`SEO.${key}.OG_DESCRIPTION`),
      images: [`${baseUrl}/img/logo.png`],
    },
  };
};

const Home: FC = () => {
  return <LandingPage />;
};

export default Home;
