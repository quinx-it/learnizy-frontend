import { type Metadata } from 'next';
import { type FC } from 'react';

import { LandingPage } from '@/components/LandingPage';
import { type Locale } from '@/lib/translate';
import { getDictionary } from '@/lib/translate/getDictionary';
import { getOgLocale, getBaseUrl, getFullUrl } from '@/utils';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> => {
  const paramsBase = await params;
  const lang = paramsBase.lang as Locale;
  const dict = await getDictionary(lang);

  const ogLocale = getOgLocale(lang);
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl('/');

  const noIndex = false;

  return {
    title: dict.SEO.MAIN_PAGE_SEO.TITLE,
    description: dict.SEO.MAIN_PAGE_SEO.DESCRIPTION,
    keywords: dict.SEO.MAIN_PAGE_SEO.KEYWORDS,
    alternates: {
      canonical: fullUrl,
      languages: {
        'x-default': fullUrl,
      },
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: dict.SEO.MAIN_PAGE_SEO.OG_TITLE,
      description: dict.SEO.MAIN_PAGE_SEO.OG_DESCRIPTION,
      images: [`${baseUrl}/images/rocketOnBlue.webp`],
      locale: ogLocale,
    },
    twitter: {
      title: dict.SEO.MAIN_PAGE_SEO.OG_TITLE,
      description: dict.SEO.MAIN_PAGE_SEO.OG_DESCRIPTION,
      images: [`${baseUrl}/images/rocketOnBlue.webp`],
    },
  };
};

const Home: FC = () => {
  return <LandingPage />;
};

export default Home;
