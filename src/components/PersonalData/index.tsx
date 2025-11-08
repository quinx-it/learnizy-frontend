'use client';

import { FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import PersonalDataForm from '@/components/PersonalDataForm';
import { Heading } from '@/components/Typography';
import { useTranslation } from '@/hooks';

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
