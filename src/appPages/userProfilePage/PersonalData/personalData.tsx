'use client';

import { CardWrapper } from '@/components/CardWrapper';
import { Heading } from '@/ui/typography';
import { PersonalDataForm } from './PersonalDataForm';
import { useTranslation } from 'react-i18next';

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
