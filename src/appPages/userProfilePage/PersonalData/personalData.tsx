'use client';

import { useTranslation } from 'react-i18next';

import { CardWrapper } from '@/components/CardWrapper';
import { Heading } from '@/components/Typography';

import { PersonalDataForm } from './PersonalDataForm';

export const PersonalData = () => {
  const { t } = useTranslation();

  return (
    <CardWrapper className="h-fit max-w-full">
      <Heading variant="xl" className="mb-4">
        {t('PROFILE.PERSONAL_DATA')}
      </Heading>
      <hr className="mb-8" />
      <PersonalDataForm />
    </CardWrapper>
  );
};
