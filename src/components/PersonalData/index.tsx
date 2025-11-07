'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CardWrapper from '@/components/CardWrapper';
import PersonalDataForm from '@/components/PersonalDataForm';
import { Heading } from '@/components/Typography';

const PersonalData: FC = () => {
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

export default PersonalData;
