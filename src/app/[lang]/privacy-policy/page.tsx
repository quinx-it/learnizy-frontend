import { type Metadata } from 'next';
import { type FC } from 'react';

import LegalPage from '@/components/LegalPage';
import { type Locale } from '@/lib/translate';
import { getDictionary } from '@/lib/translate/getDictionary';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> => {
  const paramsBase = await params;
  const dict = await getDictionary(paramsBase.lang as Locale);

  return {
    title: dict.LEGAL.PRIVACY_POLICY.TITLE,
    robots: 'noindex, follow',
  };
};

const PrivacyPolicy: FC = () => {
  return <LegalPage document="PRIVACY_POLICY" />;
};

export default PrivacyPolicy;
